const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const connection= require('./db');
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', (req, res) => {
  const { email, password } = req.body;
    if(!email || ! password){
        return res.send("Email and password are required'");
    }
    if (password.length >= 4) {

        connection.query('select * from users where email=?',[email],(err,results)=>{
            if(err){
                return res.send('server error');
            }

            if(results.length>0){
                return res.send('Email already exists');
            }

            connection.query('insert into users(email,password) values(?,?)',[email,password],(err,result)=>{
                if(err === "ER_DUP_ENTRY"){
                 return res.send("email already exists!");
                }
               else if(err){
                 return  res.send("user inserted failure");
               }
                   console.log("user inserted success");
                 return  res.send('Registered success');
           });

        })
    }
   else {
    return res.send('Password must be at least 4 characters long');
  }
});


app.post("/login",(req,res)=>{
    const { email,password }= req.body;
    if(!email || !password){
        return res.send("Email and password are required");
    }

    connection.query('select * from users where email=? and password=?',[email,password],(err,results)=>{
        if(err){
            return res.send("server error");
        }
        if(results.length>0){
            return res.send('Login success');
        }
        else{
            return res.send("email and password doesn't match");
        }
    })

})

app.post('/edit',(req,res)=>{
    const {mobile,name,email,gender}= req.body;
    if(!email || !mobile || !name ){
        return res.send("Email & Moblle number & name is required");
    }
    if(mobile.length === 10){
        if(name.length>2){
            connection.query('insert into userdetails(mobile,name,email,gender) values(?,?,?,?)',[mobile,name,email,gender],(err,results)=>{
                if(err){
                    return res.send("details didn't saved");
                }
                return res.send("Details saved");
            })
        }
        else{
            return res.send('Name must be at least 3 characters long');
        }
    }
    else{
        return res.send('Mobile Number should be 10 digits');
    }

})


app.get('/userdetails',(req,res)=>{
    const {email}= req.query;
    if(!email){
        return res.send('Email is required');
    }
    
    connection.query('select * from userdetails where email=?',[email],(err,results)=>{
        if(err){
            return res.send(err);
        }
        if(results.length==0){
             return res.send('user not found');
        }

        const userdetails= results[0];
        res.send(userdetails);
    })

})


app.post('/addproduct',(req,res)=>{
    const {image,brand,detail,price,email} = req.body;
    if(!image || !brand || !detail || !price || !email){
        return res.send('all fields are required');
    }
     
    connection.query('insert into products(image,brand,detail,price,email) values(?,?,?,?,?)',[image,brand,detail,price,email],(err,results)=>{
        if(err){
            return res.send(err);
        }
        return res.send('Product added successfully');
    })

})

app.get('/getproducts',(req,res)=>{
    const {email}= req.query;
    if(!email){
        res.send('email is required');
    }
     connection.query('select * from products where email=?',[email],(err,results)=>{
        if(err){
          res.send(err);
        }
        return res.json(results);

     });

});

app.post('/addwishlist',(req,res)=>{
    const {image,brand,detail,price,email} = req.body;
    if(!image || !brand || !detail || !price || !email){
        return res.send('all fields are required');
    }
     
    connection.query('insert into wishlist(image,brand,detail,price,email) values(?,?,?,?,?)',[image,brand,detail,price,email],(err,results)=>{
        if(err){
            return res.send(err);
        }
        return res.send('Product added to wishlist');
    })

})

app.get('/getwishlist',(req,res)=>{
    const {email}= req.query;
    if(!email){
      return res.send('email is required');
    }
     connection.query('select * from wishlist where email=?',[email],(err,results)=>{
        if(err){
        return  res.send(err);
        }
        return res.json(results);
     });

});

app.delete('/deleteproduct', (req, res) => {
    const { id, email } = req.body;
    if(!id || !email){
        return res.send('id and email are required');
     }
    const query = 'DELETE FROM products WHERE id = ? AND email = ?';
    connection.query(query, [id, email], (err, result) => {
      if (err) {
        console.error('Error deleting product:', err);
        res.status(500).send('Failed to delete product');
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).send('Product not found');
        return;
      }
      res.send('Product deleted successfully');
    });
  });

app.delete('/deletewishlist',(req,res)=>{
    const {id,email} = req.body;
    if(!id || !email){
       return res.send('id and email are required');
    }
    connection.query('delete from wishlist where id=? and email=?',[id,email],(err,result)=>{
        if (err) {
            console.error('Error deleting product:', err);
            res.status(500).send('Failed to delete product');
            return;
          }
          if (result.affectedRows === 0) {
            res.status(404).send('Product not found');
            return;
          }
          res.send('Product deleted successfully');
    })
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
