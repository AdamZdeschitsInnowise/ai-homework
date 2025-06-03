const axios = require('axios');

// Function to test API response
async function testApiResponse() {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        console.log('API Response Status:', response.status);
        return response.status === 200;
    } catch (error) {
        console.error('API Response Error:', error.message);
        return false;
    }
}

// Function to test product data structure
async function testProductDataStructure() {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data;
        
        // List to store products with defects
        const defectiveProducts = [];
        
        products.forEach(product => {
            const defects = [];
            
            // Check if title is empty
            if (!product.title) {
                defects.push("Empty title");
            }
            
            // Check if price is negative
            if (product.price < 0) {
                defects.push("Negative price");
            }
            
            // Check if rating.rate exceeds 5
            if (product.rating && product.rating.rate > 5) {
                defects.push("Rating rate exceeds 5");
            }
            
            // If any defects found, add to defective products list
            if (defects.length > 0) {
                defectiveProducts.push({
                    id: product.id,
                    title: product.title,
                    defects: defects
                });
            }
        });
        
        // Print defective products
        if (defectiveProducts.length > 0) {
            console.log("\nProducts with defects:");
            defectiveProducts.forEach(product => {
                console.log(`Product ID: ${product.id}`);
                console.log(`Title: ${product.title}`);
                console.log(`Defects: ${product.defects.join(', ')}`);
                console.log("---");
            });
        } else {
            console.log("\nNo defective products found!");
        }
        
        return defectiveProducts.length === 0;
    } catch (error) {
        console.error('Data Structure Test Error:', error.message);
        return false;
    }
}

// Run all tests
async function runTests() {
    console.log("Starting API Tests...\n");
    
    const apiResponseResult = await testApiResponse();
    console.log(`API Response Test: ${apiResponseResult ? 'PASSED' : 'FAILED'}\n`);
    
    const dataStructureResult = await testProductDataStructure();
    console.log(`Data Structure Test: ${dataStructureResult ? 'PASSED' : 'FAILED'}\n`);
    
    console.log("All tests completed!");
}

// Execute tests
runTests(); 