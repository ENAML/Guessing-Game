/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
//-------------------------------------------------------------//
//						GUESSING GAME LOGIC					   //
//-------------------------------------------------------------//
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


$(document).ready(function(){


	//------------------------------------------
	// Setup
	//------------------------------------------
	
	var guessList = []; //Creates list to store user guesses
	var guessesLeft = 5; //Guess Counter variable
	var randomNumber = makeRand(); //Generates random number
	$("#textbox1").on('click', function(){
		$(this).val("");
	});

	$("#reset").on('click', reset); // Makes reset button functional
	
	//FOR USING HINT BUTTON
	// $("#hint").on('click', function(){
	// 	('#answer').slideToggle('slow');
	// });

	$('#randNum').text(randomNumber); //Displays random number (this can be removed later)

	//------------------------------------------
	// When user clicks "Guess!"
	//------------------------------------------

	$("#getTextBoxValue").on('click', function(){

		//puts user guess in variable
		var userGuess = Math.floor(+($('#textbox1').val())); 


		//clears input field after guess
		$('#textbox1').val("");


		//checks if value is a number between 1 and 100 and if it's been tried before
		if (isNaN(userGuess) || (userGuess < 1) || (userGuess > 100)) {
			alert("please enter a number between 1 and 100");
		} else {
			if (!isNewGuess(userGuess, guessList)) {  //THIS IS NOT WORKING
				userGuess = NaN; //prevents from comparing number again
			} else {
				guessList.unshift(userGuess);
				$('#results').text(guessList.join(', '));
			}
		}



		compare(userGuess, randomNumber);

		$("#textbox1").val("Enter Number Here");


		//Checks if you have any guesses left
		if (guessesLeft <= 0) {
			alert("You've gone beyond your alotted guesses - Let's play again.");
			reset();
		}

		
	});




	/////////////////////////////////////////////
	//------------------------------------------
	// FUNCTIONS
	//------------------------------------------
	/////////////////////////////////////////////


	//------------------------------------------
	// Compare / Display Feedback function
	//------------------------------------------

	function compare(userGuess, randomNumber) {
		if (userGuess == randomNumber) { // if correct
			$('#matchResult').text("You got it! Press 'Reset' to play again!");
		} else if (userGuess > randomNumber) { //if too high
			if ((randomNumber + 10) >= userGuess) { //if too high but within 10
				$('#matchResult').text("Hot! But you're a little too high - Guess Again.");
				guessesLeft--;
			} else { //if too high and beyond 10 away
				$('#matchResult').text("You're Cold. way too high - Guess Again.");
				guessesLeft--;
			}
		} else if (userGuess < randomNumber) { //if too low
			if ((randomNumber - 10) <= userGuess) {
				$('#matchResult').text("Hot! But you're too low - Guess Again.");
				guessesLeft--;
			} else {
				$('#matchResult').text("You're Cold. way too low - Guess Again.");
				guessesLeft--;
			}
		}
	}


	//------------------------------------------
	// Check if Guess Already in Array Function
	//------------------------------------------

	function isNewGuess(userGuess, guessList) {
		for (var i = 0; i < guessList.length; i++) {
			if (userGuess == guessList[i]) {
				alert("please guess a number you haven't tried already");
				return false;
			}
		}
		return true;
	}


	//------------------------------------------
	// Reset Guessing Game
	//------------------------------------------

	function reset() {
		randomNumber = makeRand();
		guessList.length = 0;
		guessesLeft = 5;
		$("#textbox1").val("Enter Number Here");
		$('#matchResult').text(' ');
		$('#results').text("");
		$('#randNum').text(randomNumber);
	}


	//------------------------------------------
	// Reset Guessing Game
	//------------------------------------------

	function makeRand() {
		return Math.floor(Math.random() * 100) + 1;
	}

});