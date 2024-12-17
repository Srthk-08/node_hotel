const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

router.post('/', async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data

    // Create a new Person document using the Mongoose model
    const newPerson = new Person(data);

    // Save the new person to the database
    const savedPerson = await newPerson.save();
    console.log('data saved');
    res.status(200).json(savedPerson)
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Get method to get the person
router.get('/', async (req, res) => {
  try {
    const data = await Person.find()
    console.log('data fetched');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
      const response = await Person.find({ work: workType })
      console.log('response fetched');
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'Invalid work type' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the URL parameter
    const updatedPersonData = req.body; // Updated data for the person

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true, // Return the updated doucment
      runValidators: true, // Run Mongoose validation
    })

    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('data updated');
    res.status(200).json(response)
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the URL parameter

    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('data deleted');
    res.status(200).json({ message: ' Person Deleted Successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

///
module.exports = router;