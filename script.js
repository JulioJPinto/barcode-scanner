// Import the Quagga2 library using ES6 module syntax
import Quagga from 'quagga2';

// Initialize an array to hold detected barcodes
const barcodes = [];

// Initialize Quagga
Quagga.init(
    {
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector("#scanner-container"),
            constraints: {
                width: 480,
                height: 320,
                facingMode: "environment"
            },
        },
        decoder: {
            readers: ["code_128_reader"]
        }
    },
    function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    }
);

// Handle barcode detection
Quagga.onDetected((data) => {
    const code = data.codeResult.code;
    barcodes.push(code);
    if (barcodes.length === 5 ) {
        console.log(barcodes);
        console.log(mostFrequent(barcodes));

        barcodes.splice(0, 5);
    }
});

// Function to find the most frequent string in an array
function mostFrequent(arr) {
    return arr.sort((a, b) =>
        arr.filter(v => v === a).length
        - arr.filter(v => v === b).length
    ).pop();
}
