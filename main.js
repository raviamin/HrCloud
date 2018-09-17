var employee = [];

function init(){
    var employeeDetails = localStorage.getItem("employeeData");

    if (employeeDetails) {
        employee = JSON.parse(employeeDetails);
        for (var i = 0; i < employee.length; i++) {
            createDetailDiv(employee[i]);
        }
    } else {
        document.getElementById("first-page").classList.remove('hidden');
        document.getElementById("employeePage").style.display = "none";
    }
}
function showSlider(obj) {
    document.getElementById("slider").classList.add('slider-show');
    if(obj) {
        document.getElementById('fullName').value = obj.name;
        document.getElementById('email').value = obj.email;
        document.getElementById('salary').value = obj.salary;
        document.getElementById('investment').value = obj.investment;
        document.getElementById('taxIncome').value = obj.taxIncome;
        document.getElementById('taxPayable').value = obj.taxPayable;
    }
}

function hideSlider() {
    document.getElementById("slider").classList.remove('slider-show');

    document.getElementById('fullName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('salary').value = '';
    document.getElementById('investment').value = '';
    document.getElementById('taxIncome').value = '';
    document.getElementById('taxPayable').value = '';
}

function isValid() {
    var fullname = document.getElementById("fullName");
    var email = document.getElementById("email");
    var salary = document.getElementById("salary");
    var investment = document.getElementById("investment");

    if (fullname.value == "") {
        fullname.parentElement.classList.add("error");
        document.getElementsByClassName("error-div")[0].innerHTML = "Please Enter Name";
        fullname.focus();
        return false;
    } else if (fullname.value !== "") {
        fullname.parentElement.classList.remove("error");
        if (email.value == "") {
            email.parentElement.classList.add("error");
            document.getElementsByClassName("error-div")[1].innerHTML = "Please Enter Email";
            email.focus();
            return false;
        } else if (email.value !== "") {
            email.parentElement.classList.remove("error");
            if (salary.value == "") {
                salary.parentElement.classList.add("error");
                document.getElementsByClassName("error-div")[2].innerHTML = "Please Enter Salary";
                salary.focus();
                return false;
            } else if (salary.value !== "") {
                salary.parentElement.classList.remove("error");

                if(investment.value > 150000) {
                    return false;
                } else {
                    return true
                }
            }
        }
    }
}

function submitValue() {
    var newEmployee = {};
    var validationFunction = isValid();

    var tempName = document.getElementById('fullName').value;
    var tempEmail = document.getElementById('email').value;
    var tempSalary = document.getElementById('salary').value;
    var tempInvestment = document.getElementById('investment').value;
    var tempTaxIncome = document.getElementById('taxIncome').value;
    var tempTaxPayable =  document.getElementById('taxPayable').value;

    if(validationFunction) {

        var employeeExists = false;

        for(var l = 0; l < employee.length; l++){
            if(employee[l].email === tempEmail){
                employeeExists = true;
                employee[l].name = tempName;
                employee[l].email = tempEmail;
                employee[l].salary = tempSalary;
                employee[l].investment = tempInvestment;
                employee[l].taxIncome = tempTaxIncome;
                employee[l].taxPayable = tempTaxPayable;
            }
        }

        if(!employeeExists){
            newEmployee.name = tempName;
            newEmployee.email = tempEmail;
            newEmployee.salary = tempSalary;
            newEmployee.investment = tempInvestment;
            newEmployee.taxIncome = tempTaxIncome;
            newEmployee.taxPayable = tempTaxPayable;

            employee.push(newEmployee);

            createDetailDiv(newEmployee);
        } else{
            document.getElementById("employeeDetails").innerHTML = "";
            for (var i = 0; i < employee.length; i++) {
                createDetailDiv(employee[i]);
            }
        }

        document.getElementById('fullName').value = '';
        document.getElementById('email').value = '';
        document.getElementById('salary').value = '';
        document.getElementById('investment').value = '';
        document.getElementById('taxIncome').value = '';
        document.getElementById('taxPayable').value = '';

        localStorage.setItem("employeeData", JSON.stringify(employee));
        hideSlider();
    }
}

function createDetailDiv(newEmployee) {
    var employeeCard = document.createElement('div');
    var detailsDiv = document.createElement('div');
    var nameDesignationEditDiv = document.createElement('div');
    var nameDesignationDiv = document.createElement('div');
    var name = document.createElement('div');
    var designation = document.createElement('div');
    var taxDiv = document.createElement('div');
    var taxableIncomeDiv = document.createElement('div');
    var taxableIncome = document.createElement('div');
    var taxableIncomeText = document.createElement('div');
    var taxPayableDiv = document.createElement('div');
    var taxPayable = document.createElement('div');
    var taxPayableText = document.createElement('div');
    var editEmployee = document.createElement('div');
    document.getElementById("employeePage").style.display = "block";
    document.getElementById('employeeDetails').appendChild(employeeCard);
    document.getElementById('employeeDetails').style.display = "block";

    name.innerHTML = newEmployee.name;
    taxableIncome.innerHTML = newEmployee.taxIncome;
    taxPayable.innerHTML = newEmployee.taxPayable;
    designation.innerHTML = "UI developer";
    taxableIncomeText.innerHTML = "Taxable Income";
    taxPayableText.innerHTML = "Tax Payable";

    employeeCard.classList.add('employee-card');
    employeeCard.appendChild(detailsDiv);
    detailsDiv.appendChild(nameDesignationEditDiv);
    nameDesignationEditDiv.appendChild(nameDesignationDiv);
    nameDesignationEditDiv.classList.add('name-designation-edit-div');
    nameDesignationDiv.classList.add('name-designation-div');
    name.classList.add('employee-name');
    designation.classList.add('employee-designation');
    taxableIncome.classList.add('employee-taxable-income');
    taxPayable.classList.add('employee-tax-payable');
    taxableIncomeText.classList.add('taxable-income-text');
    taxPayableText.classList.add('tax-payable-text');
    detailsDiv.classList.add('details-div');
    detailsDiv.appendChild(taxDiv);
    taxDiv.classList.add('tax-div');
    taxableIncomeDiv.classList.add('taxable-income-div');
    taxPayableDiv.classList.add('tax-payable-div');
    editEmployee.classList.add('edit');

    nameDesignationDiv.appendChild(name);
    nameDesignationDiv.appendChild(designation);
    nameDesignationEditDiv.appendChild(editEmployee);
    taxDiv.appendChild(taxableIncomeDiv);
    taxableIncomeDiv.appendChild(taxableIncome);
    taxableIncomeDiv.appendChild(taxableIncomeText);
    taxDiv.appendChild(taxPayableDiv);
    taxPayableDiv.appendChild(taxPayable);
    taxPayableDiv.appendChild(taxPayableText);
    editEmployee.onclick = function() {
        showSlider(newEmployee);
    }

    document.getElementById('first-page').classList.add('hidden');
}

function calculateTax() {
    var currentSalary = document.getElementById('salary').value;
    var investedIncome = document.getElementById('investment').value;
    var taxableAmount = currentSalary - investedIncome;

    if(investedIncome > 150000) {
        document.getElementById('investment').classList.add("investment-error");
    } else {
        document.getElementById('investment').classList.remove("investment-error");
    }

    if(currentSalary) {
        if(taxableAmount > 0) {
            if (taxableAmount < 250000) {
                document.getElementById('taxIncome').value = taxableAmount;
                document.getElementById('taxPayable').value = 0;
            } else if (250000 <= taxableAmount < 500000) {
                document.getElementById('taxIncome').value = taxableAmount;
                document.getElementById('taxPayable').value = taxableAmount * 5 / 100;
            } else if (500000 <= taxableAmount < 1000000) {
                document.getElementById('taxIncome').value = taxableAmount;
                document.getElementById('taxPayable').value = taxableAmount * 20 / 100;
            } else if (taxableAmount >= 1000000) {
                document.getElementById('taxIncome').value = taxableAmount;
                document.getElementById('taxPayable').value = taxableAmount * 30 / 100;
            }
        }
    }
}

init();