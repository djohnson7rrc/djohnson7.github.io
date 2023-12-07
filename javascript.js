/********f************
    
    Project 4
    Name:  Dave Johnson
    Date: Dec 6th, 2023
    Description:  The .js file responsible for the form validation on the contact us page.


*********************/
/*This function starts when the submit button is pressed. It run through the formHasErrors function
and if it returns false, prevents the forms from submitting. If it returns true, the forms
submit.*/
function validate(e) {
	console.log("validate function called");
	hideAllErrors();
 
	if (formHasErrors()) {
		e.preventDefault();
		return false;
	}
 
	return true;
}

/*This function starts when the reset button is pressed. It presents a dialog box using the confirm
keyword asking the user if they want to clear all forms. If yes, the all forms are cleared of
values.*/
function resetForm(e) {
	if (confirm('Clear Forms?')) {
		hideAllErrors();
 
		document.getElementById("name").focus();
 
		return true;
	}
 
	e.preventDefault();
 
	return false;
}

/*The main place where the the form validation takes place.*/
function formHasErrors() {
    /*First we initialize the error flag. If the forms are validated, this returns true, otherwise
    it returns false. This is going to be what the validate function relies on.*/
    let errorFlag = false;
    //This creates an array of the forms we want filled.
    let requiredFields = ["name", "phone", "email", "comment"];

    /*We're using the formFieldHasInput to check if form have values. If it fails
    the check, we highlight the label label and change the color of the text.*/
    for (let i = 0; i < requiredFields.length; i++) {
        let textField = document.getElementById(requiredFields[i]);
        let label = document.querySelector(`label[for=${requiredFields[i]}]`);

        /*if the text field is empty, this changes the color of the label, displays the error
        message, and sets the focus and select to the offending field.*/
        if (!formFieldHasInput(textField)) {
            label.style.backgroundColor = "#FF0000";
            label.style.color = "#000000";
            document.getElementById("required_" + requiredFields[i]).style.display = "block";

            if (!errorFlag) {
                textField.focus();
                textField.select();
            }

            errorFlag = true;
        } else {
            label.style.backgroundColor = "";
            label.style.color = "";
        }
    }

    /*where we check to make sure the user input a name that is two words long separated by a
    space*/
    let nameValue = document.getElementById("name").value;
    let nameWords = nameValue.split(" ");

    /*Similar to the above, if the name is not valid, the label changes background color
    and text color, and the focus is set to it.*/
    if (formFieldHasInput(document.getElementById("name")) && nameWords.length !== 2) {
        document.getElementById("nameerror").style.display = "block";
        document.querySelector('label[for="name"]').style.backgroundColor = "#FF0000";
        document.querySelector('label[for="name"]').style.color = "#000000";

        if (!errorFlag) {
            document.getElementById("name").focus();
            document.getElementById("name").select();
        }

        errorFlag = true;
    } else {
        document.getElementById("nameerror").style.display = "none";
        document.querySelector('label[for="name"]').style.backgroundColor = "";
        document.querySelector('label[for="name"]').style.color = "";
    }

    //Checking to make sure the email is valid.
    let emailValue = document.getElementById("email").value;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formFieldHasInput(document.getElementById("email")) && !emailRegex.test(emailValue)) {
        document.getElementById("emailerror").style.display = "block";
        document.querySelector('label[for="email"]').style.backgroundColor = "#FF0000";
        document.querySelector('label[for="email"]').style.color = "#000000";

        if (!errorFlag) {
            document.getElementById("email").focus();
            document.getElementById("email").select();
        }

        errorFlag = true;
    } else {
        document.getElementById("emailerror").style.display = "none";
        document.querySelector('label[for="email"]').style.backgroundColor = "";
        document.querySelector('label[for="email"]').style.color = "";
    }

     //checking to make sure the phone number is ten digits long.
    let regex = /^\d{10}$/;
    let phoneNumValue = document.getElementById("phone").value;

    if (formFieldHasInput(document.getElementById("phone"))) {
        if (!regex.test(phoneNumValue)) {
            document.getElementById("phoneerror").style.display = "block";

            if (!errorFlag) {
                document.getElementById("phone").focus();
                document.getElementById("phone").select();
            }

            // Apply styling only if there's an error
            document.querySelector('label[for="phone"]').style.backgroundColor = "#FF0000";
            document.querySelector('label[for="phone"]').style.color = "#000000";

            errorFlag = true;
        } else {
            document.getElementById("phoneerror").style.display = "none";
            // Clear styling when there's no error
            document.querySelector('label[for="phone"]').style.backgroundColor = "";
            document.querySelector('label[for="phone"]').style.color = "";
        }
    }

    return errorFlag;
}



/*We only want the error messages to show when a field has not been filled or has been filled
incorrectly. This function hides the error messages until they are needed.*/
function hideAllErrors() {
 
	// Get an array of the error fields
	let errorFields = document.getElementsByClassName("contacterror");
	for(let i = 0; i < errorFields.length; i++){
		errorFields[i].style.display = "none";
	}
	console.log("hideAllErrors called");
 
}

/*This is used to by formHasErrors to make sure all the fields have content in them.*/
function formFieldHasInput(fieldElement) {
	if (fieldElement.value == null || fieldElement.value.trim() == "") {
		return false;
	}
 
	return true;
}

/*Under the load, we've added event listeners to the two buttons. We've also loaded
the function hideAllErrors so that when the page first loads, all the error messages
are hidden.*/
function load() {
	console.log("load function called");
    document.getElementById("survey_form").addEventListener("submit", validate);

    document.getElementById("survey_form").reset();

    document.getElementById("survey_form").addEventListener("reset", resetForm);

    hideAllErrors();
}

document.addEventListener("DOMContentLoaded", load);
