let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let buttons = document.querySelectorAll("button");
let lastKnownButtonId = undefined;
let lastKnownButtonNumber = undefined;
let matches = 0;

shuffle(numbers);
distributeNumbers();

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function (e) {
        
        // when first click
        if (!lastKnownButtonId && !lastKnownButtonNumber) {
            e.target.textContent = e.target.dataset.number;
            lastKnownButtonId = e.target.id;
            lastKnownButtonNumber = e.target.dataset.number;
        } 

        // when second click
        else if (lastKnownButtonId && lastKnownButtonNumber && e.target.id != lastKnownButtonId) {
            e.target.textContent = e.target.dataset.number;

            // condition when the number is match
            if (e.target.dataset.number == lastKnownButtonNumber) {
                e.target.style.backgroundColor = '#014E89'
                document.getElementById(lastKnownButtonId).style.backgroundColor = '#014E89';
                lastKnownButtonId = undefined;
                lastKnownButtonNumber = undefined;
                matches++;

                // condition when the match done
                if (matches == 8) {
                    document.write('game berakhir, reload halaman untuk bermain kembali ')
                }
            } 

            // condition when the number doesn't match
            else {
                document.getElementById(lastKnownButtonId).style.backgroundColor = '#A4448E';
                e.target.style.backgroundColor = '#A4448E';
                setTimeout(() => {
                    e.target.style.backgroundColor = '#EFEFEF'
                    e.target.textContent = "";
                    let tempLastClickedButton = document.getElementById(lastKnownButtonId);
                    tempLastClickedButton.style.backgroundColor = '#EFEFEF'
                    tempLastClickedButton.textContent = "";
                    lastKnownButtonId = undefined;
                    lastKnownButtonNumber = undefined;
                    wait = false;
                }, 700);
            }
        }
    });
}

// function to distribute result of shuffle array
function distributeNumbers() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].dataset.number = numbers[i];
    }
}

// function to shuffle the array
function shuffle(array) {
    let temp = 0;
    let x = 0;
    for (let i = array.length - 1; i > 0; i--) {
        temp = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[temp];
        array[temp] = x;
    }
    return array;
}
