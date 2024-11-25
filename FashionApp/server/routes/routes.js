const express = require('express');
const router = express.Router();
const { clientApplication } = require('./client');
const fs = require('fs');

router.post("/createproduct", async (req, res) => {
  try {
    const { productId, type, quantity, quality, supplyDate, origin, supplierName } = req.body;

    let supplierClient = new clientApplication();

    // Submit the transaction and log the result
    const result = await supplierClient.submitTxn(
      "supplier",
      "mychannel",
      "basic",
      "ProductContract",
      "invokeTxn",
      "",
      "createProduct",
      productId,
      type,
      quantity,
      quality,
      supplyDate,
      origin,
      supplierName
    );

    // Log result to understand its contents
    console.log("Result from submitTxn:", result);

    // Decode result if it exists
    let decodedResult = result ? Buffer.from(result).toString('utf8') : '';

    // Attempt to parse JSON if decodedResult has data
    let parsedResult;
    if (decodedResult) {
      try {
        parsedResult = JSON.parse(decodedResult);
      } catch (parseError) {
        console.error("Error parsing result as JSON:", parseError.message);
        parsedResult = { rawResponse: decodedResult };  // Fallback if JSON.parse fails
      }
    } else {
      parsedResult = { message: "submitTxn returned an empty result. Check submitTxn implementation and network connection." };
    }

    // Send the response back to the client
    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: parsedResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product. Please check the product details.",
      data: { error: error.message },
    });
  }
});

router.post("/readproduct", async (req, res) => {
  try {
    const { productId } = req.body;

    // Create an instance of the client application for querying
    let supplierClient = new clientApplication();

    // Submit the transaction for fetching the product details
    const result = await supplierClient.submitTxn(
      "supplier",           // Supplier MSP ID
      "mychannel",          // Channel name
      "basic",              // Chaincode name
      "ProductContract",    // Smart contract name
      "queryTxn",           // Transaction type for query
      "",                   // Options (empty string if not required)
      "readProduct",       // Function name to fetch product
      productId             // Product ID to fetch
    );

    // Decode and parse the result if available
    let decodedResult = result ? Buffer.from(result).toString('utf8') : '';
    let parsedResult;
    if (decodedResult) {
      try {
        parsedResult = JSON.parse(decodedResult);
      } catch (parseError) {
        console.error("Error parsing result as JSON:", parseError.message);
        parsedResult = { rawResponse: decodedResult };  // Fallback if JSON.parse fails
      }
    } else {
      parsedResult = { message: "No product found or empty result from fetchProduct." };
    }

    // Send product data back to the client
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: parsedResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product. Please check the product ID.",
      data: { error: error.message },
    });
  }
});


// Route to create a dress
router.post("/createdress", async (req, res) => {
  try {
    // Destructure the input data from the request body
    const { dressId, type, productId, quality } = req.body;

    // Validate the input data
    if (!dressId || !type || !productId || !quality) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields. Please provide dressId, type, productId, and quality.",
      });
    }

    // Create an instance of the client application for the manufacturer
    let manufacturerClient = new clientApplication();

    // Submit the transaction to create a dress
    const result = await manufacturerClient.submitTxn(
      "manufacturer",       // MSP ID or identity of the manufacturer
      "mychannel",          // Channel name
      "basic",              // Chaincode name
      "ProductContract",     // Contract name
      "dressTxn",           // Transaction type (invokeTxn for creation)
      "",                   // Options (empty string if not needed)
      "createDress",        // Function name to call
      dressId,              // Dress ID (e.g., "Dress3")
      type,                 // Type of the dress (e.g., "Casual")
      productId,            // Product ID (e.g., "Product200")
      quality               // Quality of the dress (e.g., "90")
    );

    // Decode the result if it exists
    let decodedResult = result ? Buffer.from(result).toString('utf8') : '';
    let parsedResult;
    if (decodedResult) {
      try {
        parsedResult = JSON.parse(decodedResult);
      } catch (parseError) {
        console.error("Error parsing result as JSON:", parseError.message);
        parsedResult = { rawResponse: decodedResult };  // Fallback if JSON.parse fails
      }
    } else {
      parsedResult = { message: "submitTxn returned an empty result. Check submitTxn implementation and network connection." };
    }

    // Send the response back to the client
    res.status(201).json({
      success: true,
      message: "Dress created successfully!",
      data: parsedResult,
    });
  } catch (error) {
    console.error("Error creating dress:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create dress. Please check the input details.",
      data: { error: error.message },
    });
  }
});

// Route to read a created dress
router.post("/readdress", async (req, res) => {
  try {
    const { dressId } = req.body;

    // Validate input
    if (!dressId) {
      return res.status(400).json({
        success: false,
        message: "Missing required field: dressId",
      });
    }

    // Create an instance of the client application for querying
    let manufacturerClient = new clientApplication();

    // Submit the transaction for fetching the dress details
    const result = await manufacturerClient.submitTxn(
      "manufacturer",         // MSP ID of the requesting entity
      "mychannel",            // Channel name
      "basic",                // Chaincode name
      "ProductContract",      // Contract name
      "queryTxn",             // Transaction type for query
      "",                     // Options (empty string if not required)
      "readDress",            // Function name to fetch the dress
      dressId                 // Dress ID to fetch
    );

    // Decode and parse the result if available
    let decodedResult = result ? Buffer.from(result).toString('utf8') : '';
    let parsedResult;
    if (decodedResult) {
      try {
        parsedResult = JSON.parse(decodedResult);
      } catch (parseError) {
        console.error("Error parsing result as JSON:", parseError.message);
        parsedResult = { rawResponse: decodedResult };  // Fallback if JSON.parse fails
      }
    } else {
      parsedResult = { message: "No dress found or empty result from readDress." };
    }

    // Send the dress data back to the client
    res.status(200).json({
      success: true,
      message: "Dress fetched successfully!",
      data: parsedResult,
    });
  } catch (error) {
    console.error("Error reading dress:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dress. Please check the dress ID.",
      data: { error: error.message },
    });
  }
});


router.post('/approve-dress', async (req, res) => {
  const { dressId } = req.body; // Extract dressId from request body
  const validatorClient = new clientApplication(); // Initialize here

  try {
    const result = await validatorClient.submitTxn(
      "validator",
      "mychannel",
      "basic",
      "ProductContract",
      "approveTxn",
      "",
      "approveDress",
      dressId
    );

    const decodedString = new TextDecoder().decode(result);
    res.status(200).json({
      message: "Dress approved successfully",
      decodedString,
      status: "success"
    });
  } catch (error) {
    console.error("Failed to approve dress:", error);
    res.status(500).json({
      message: "Failed to approve dress",
      error: error.message
    });
  }
});

// Route to order a dress
router.post('/orderdress', async (req, res) => {
  try {
    const { orderId, dressId, quantity } = req.body;

    // Validate input to ensure all required fields are present
    if (!orderId || !dressId || quantity == null) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields. Please provide orderId, dressId, and quantity.',
      });
    }

    // Create an instance of the client application for the retailer
    let retailerClient = new clientApplication();

    // Format quantity as per protobuf expectations
    const formattedQuantity = Array.isArray(quantity)
      ? quantity.map(q => q.toString())  // Ensure each quantity is converted to string format
      : [quantity.toString()];           // Wrap single quantity as a string in an array

    // Submit the transaction to order a dress
    const result = await retailerClient.submitTxn(
      "retailer",            // MSP ID or identity of the retailer
      "mychannel",           // Channel name
      "basic",               // Network/chaincode name
      "ProductContract",     // Smart contract name
      "orderDressTxn",       // Transaction function type
      "",                    // Options (empty string if not required)
      "orderDress",          // Function to call
      orderId,               // Order ID
      dressId,               // Dress ID to order
      ...formattedQuantity   // Spread formattedQuantity array as individual arguments
    );

    // Decode and parse the result if available
    let decodedResult = result ? Buffer.from(result).toString('utf8') : '';
    let parsedResult;

    if (decodedResult) {
      if (decodedResult.startsWith("{") || decodedResult.startsWith("[")) {
        // Attempt to parse as JSON if it looks like JSON
        try {
          parsedResult = JSON.parse(decodedResult);
        } catch (parseError) {
          console.error("Error parsing result as JSON:", parseError.message);
          parsedResult = { rawResponse: decodedResult };  // Fallback to plain text if JSON.parse fails
        }
      } else {
        // Treat as plain text if it doesn’t look like JSON
        parsedResult = { rawResponse: decodedResult };
      }
    } else {
      parsedResult = { message: "submitTxn returned an empty result. Check submitTxn implementation and network connection." };
    }

    // Send the response back to the client
    res.status(201).json({
      success: true,
      message: "Dress order placed successfully!",
      data: parsedResult,
    });

  } catch (error) {
    console.error("Failed to place dress order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to place dress order. Please check the input details.",
      data: { error: error.message },
    });
  }
});



router.post('/getDressDetails', async (req, res) => {
  const { dressId } = req.body; // Expecting dressId in the body of the POST request

  // Ensure that the dressId is provided
  if (!dressId) {
    return res.status(400).json({ error: 'dressId is required in the request body' });
  }

  try {
    // Create a new instance of the client application
    let retailerClient = new clientApplication();

    // Call the getDressDetails function on the smart contract
    const result = await retailerClient.submitTxn(
      "retailer",           // MSP ID or identity of the retailer
      "mychannel",          // Channel name
      "basic",              // Network/chaincode name
      "ProductContract",    // Smart contract name
      "readHistoryTxn",     // Transaction type (read the dress details)
      "",                   // Placeholder for extra arguments (if any)
      "getDressDetails",    // Function name in contract to invoke (getDressDetails)
      dressId               // Dress ID to query
    );

    // Decode and parse the JSON result from the blockchain
    const decodedString = new TextDecoder().decode(result);
    const dressDetails = JSON.parse(decodedString);

    // Send the dress details as a response
    return res.json({
      dress: dressDetails.dress,
      dressHistory: dressDetails.dressHistory,
      rawMaterials: dressDetails.rawMaterials || [],
      orders: dressDetails.orders || []
    });

  } catch (error) {
    console.error("Failed to fetch dress details:", error);
    return res.status(500).json({ error: 'Failed to fetch dress details' });
  }
});




router.post('/createOrder', async (req, res) => {
  try {
    // Initialize client application instance
    let userClient = new clientApplication();

    // Destructure the order data from the request body
    const { type, quantity, price, supplierName, orderId } = req.body;

    // Validate required fields
    if (!type || !quantity || !price || !supplierName || !orderId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields. Please provide type, quantity, price, supplierName, and orderId.',
      });
    }

    // Set up transient data for the product creation transaction
    const transientData = {
      type: Buffer.from(type),
      quantity: Buffer.from(quantity.toString()),
      price: Buffer.from(price.toString()),
      supplierName: Buffer.from(supplierName),
    };

    // Submit the transaction to create a new order
    const result = await userClient.submitTxn(
      "manufacturer",      // Simplified MSP ID as per client-side
      "mychannel",         // Channel name
      "basic",             // Chaincode name
      "OrderContract",     // Contract name for order creation
      "privateNewTxn",     // Transaction handling type
      transientData,       // Transient data with required order fields
      "createOrder",       // Transaction function name
      orderId              // Order ID parameter
    );

    // Decode and parse the result if available
    let decodedResult = result ? new TextDecoder().decode(result) : '';
    let parsedResult;

    if (decodedResult) {
      try {
        parsedResult = JSON.parse(decodedResult);
      } catch (parseError) {
        console.error("Error parsing result as JSON:", parseError.message);
        parsedResult = { rawResponse: decodedResult };  // Fallback to plain text if JSON.parse fails
      }
    } else {
      parsedResult = { message: "submitTxn returned an empty result. Check submitTxn implementation and network connection." };
    }

    // Send the response back to the client
    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: parsedResult,
    });

  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order. Please check the order details.",
      data: { error: error.message },
    });
  }
});


router.post('/getOrder', async (req, res) => {
  try {
    // Initialize client application instance
    let userClient = new clientApplication();

    // Extract orderId from request body
    const { orderId } = req.body;

    // Validate the orderId
    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: orderId',
      });
    }

    // Submit the transaction to read the order
    const result = await userClient.submitTxn(
      "manufacturer",          // Organization or MSP ID
      "mychannel",             // Channel name
      "basic",                 // Chaincode name
      "OrderContract",         // Contract name with the readOrder function
      "queryTxn",              // Transaction type
      "",                      // No transient data for reading
      "readOrder",             // Function name in the smart contract
      orderId                  // The orderId of the order to be read
    );

    // Decode and parse the result if available
    let decodedResult = result ? new TextDecoder().decode(result) : '';
    let parsedResult;

    if (decodedResult) {
      try {
        parsedResult = JSON.parse(decodedResult);
      } catch (parseError) {
        console.error("Error parsing result as JSON:", parseError.message);
        parsedResult = { rawResponse: decodedResult };  // Fallback to plain text if JSON.parse fails
      }
    } else {
      parsedResult = { message: "submitTxn returned an empty result. Check submitTxn implementation and network connection." };
    }

    // Send the response back to the client with order details
    res.status(200).json({
      success: true,
      message: "Order details retrieved successfully!",
      data: parsedResult,
    });

  } catch (error) {
    console.error("Failed to retrieve order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve order. Please check the orderId.",
      data: { error: error.message },
    });
  }
}); router.post('/getOrder', async (req, res) => {
  try {
    // Initialize client application instance
    let userClient = new clientApplication();

    // Extract orderId from request body
    const { orderId } = req.body;

    // Validate the orderId
    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: orderId',
      });
    }

    // Submit the transaction to read the order
    const result = await userClient.submitTxn(
      "manufacturer",          // Organization or MSP ID
      "mychannel",             // Channel name
      "basic",                 // Chaincode name
      "OrderContract",         // Contract name with the readOrder function
      "queryTxn",              // Transaction type
      "",                      // No transient data for reading
      "readOrder",             // Function name in the smart contract
      orderId                  // The orderId of the order to be read
    );

    // Decode and parse the result if available
    let decodedResult = result ? new TextDecoder().decode(result) : '';
    let parsedResult;

    if (decodedResult) {
      try {
        parsedResult = JSON.parse(decodedResult);
      } catch (parseError) {
        console.error("Error parsing result as JSON:", parseError.message);
        parsedResult = { rawResponse: decodedResult };  // Fallback to plain text if JSON.parse fails
      }
    } else {
      parsedResult = { message: "submitTxn returned an empty result. Check submitTxn implementation and network connection." };
    }

    // Send the response back to the client with order details
    res.status(200).json({
      success: true,
      message: "Order details retrieved successfully!",
      data: parsedResult,
    });

  } catch (error) {
    console.error("Failed to retrieve order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve order. Please check the orderId.",
      data: { error: error.message },
    });
  }
});










module.exports = router;
