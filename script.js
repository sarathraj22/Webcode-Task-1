var result_table = document.createElement("table");
result_table.setAttribute("class", "table text-center result-table col-md-6 col-sm-6");
document.body.append(result_table);

var thead = document.createElement("thead");
var tData = document.createElement("tr");

var givenName = createTable("th", "Name");
givenName.setAttribute("scope", "col");
givenName.innerHTML = "Name";

var country_id = createTable("th", "Countries");
country_id.setAttribute("scope", "col");
country_id.innerHTML = "Country";

var probability = createTable("th", "Probabilities");
probability.setAttribute;
probability.innerHTML = "Probability";

tData.append(givenName, country_id, probability);
result_table.append(thead);
thead.append(tData);
document.body.append(result_table);

function createTable(key, val) {
    var data = document.createElement(key);
    data.innerHTML = val;
    return data;
}

var tbody = document.createElement("tbody");

document.getElementById("submit-btn").addEventListener("click", submit);

async function submit() {
    var inputData = document.getElementById("input").value;

    try {
        var apiData = await fetch(`https://api.nationalize.io/?name=${inputData}`);
        var tableData = await apiData.json();
        tbody.innerHTML = "";
    } catch (error) {
        console.log(error);
    }

    var country = [];
    var probability = [];
    for (i = 2; i < tableData.country.length; i++) {
        country.push(tableData.country[i].country_id);
        probability.push(tableData.country[i].probability);

    }
    var Name = tableData.name;
    var tRow = document.createElement("tr");
    var tData = document.createElement("td");
    tData.setAttribute("rowspan", tableData.country.length + 1);
    tData.innerHTML = `${Name}`;
    tRow.append(tData);
    tbody.append(tRow);
    for (j = 1; j < country.length; j++) {
        var countryId = document.createElement("td");
        countryId.innerHTML = `${country[j]}`;

        var probabilityNo = document.createElement("td");
        probabilityNo.innerHTML = `${probability[j]}`;

        var results = document.createElement("tr");
        results.append(countryId, probabilityNo);
        tbody.append(results);
    }
    result_table.append(tbody);
}