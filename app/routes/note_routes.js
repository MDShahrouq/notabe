

var ObjectID = require('mongodb').ObjectID;

module.exports = function (app,db) {
// TO get the Note with ID
	app.get('/notes/:id', (req,res) => {
		const id = req.params.id;
		const details = {'_id': new ObjectID(id)};

		db.collection('notes').findOne(details, (err, item)=>{
			if(err){
				console.log({'error':'Wrong ID check it'});
			}else{
				res.send(item);
			}
		});
	});

	// Delete any Note using ID

	app.delete('/notes/:id',(req,res) => {
		const id = req.params.id;
		const details = {'_id': new ObjectID(id)};

		db.collection('notes').remove(details, (err,item) =>{
			if(err){
				res.send({'error':'Error occured while Deleting'});
			} else{
				res.send({'ID':id,'Status':'Note Deleted!'});
			}
		});

	});
	// Update your existing Note

 app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });

	// To post new Note 
	app.post('/notes', (req, res) => {
			// console.log(req.body)
			// res.send('Hello')

			const note = {text:req.body.body, title:req.body.title};
			db.collection('notes').insert(note, (err,result) => {
				if(err){
					res.send({'error':'An Error has occured check your Body'});
				} else {
					res.send(result.ops[0]);
				}
				
			});
		});
};