import React, { createContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Productcontext = createContext();

const email_initial_state = {
  email: null,
  isloggedin: false
};

const editdetails_initial = {
  mobile: "",
  name: "",
  email: "",
  gender: ""
};

const reducerfunction = (store, action) => {
  switch (action.type) {
    // case "ADD_TO_CART":
    //   return [...store, action.payload.item];
    case "SET_PRODUCTS":
      return [...store,action.payload.items]; // Correctly set items
    case "MOVE_TO_BAG":
      return [...store, action.payload.item];
    case "DELETE_BAG":
      return store.filter((item) => item.id !== action.payload.item.id);
    default:
      return store;
  }
};

const reducerwish = (store, action) => {
  switch (action.type) {
    case "ADD_TO_WISH":
      return [action.payload.data];
    case "DELETE_WISH":
      return store.filter((item) => item.id !== action.payload.item.id);
    default:
      return store;
  }
};

const userreducer = (store, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        email: action.payload.email,
        isloggedin: true
      };
    case "USER_LOGOUT":
      return email_initial_state;
    default:
      return store;
  }
};

const editreducer = (store, action) => {
  switch (action.type) {
    case "EDIT_SAVED":
      return {
        ...store,
        mobile: action.payload.mobile,
        name: action.payload.name,
        email: action.payload.email,
        gender: action.payload.gender
      };
    default:
      return store;
  }
}

export function Productlistcontext({ children }) {
  const [message, setmessage] = useState("");
  const [editmessage, seteditmessage] = useState("");
  const [userdetails, setuserdetails] = useState({
    id: null,
    mobile: "",
    name: "",
    email: "",
    gender: ""
  });
  const [bagproducts,setbagproducts]=useState([]);
  const [wishproducts,setwishproducts]=useState([]);


  const [products, dispatchproduct] = useReducer(reducerfunction, []);
  const [productwish, dispatchwish] = useReducer(reducerwish, []);
  const [useremail, dispatchemail] = useReducer(userreducer, email_initial_state);
  const [editdetails, dispatchedit] = useReducer(editreducer, editdetails_initial);

  const navigate = useNavigate();

  const addtobag = async (item) => {
    try {
      const response = await fetch('http://localhost:3000/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          image: item.img,
          brand: item.brand,
          detail: item.detail,
          price: item.rs,
          email: useremail.email
        })
      });
      const data = await response.text();
      if (data === 'Product added successfully') {
          console.log('Product added successfully');
          setbagproducts(prev=>[...prev,item]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const movetobag = async (item) => {
    try {
      const response = await fetch('http://localhost:3000/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          image: item.img,
          brand: item.brand,
          detail: item.detail,
          price: item.rs,
          email: useremail.email
        })
      });
      const data = await response.text();
      if (data === 'Product added successfully') {
          console.log('Product added successfully');
          setbagproducts(prev=>[...prev,item]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchproducts = async (email) => {
    try {
      const response = await fetch(`http://localhost:3000/getproducts?email=${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setbagproducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addtowishlist = async (item) => {
      try {
          const response = await fetch('http://localhost:3000/addwishlist',{
            method:'POST',
            headers:{
              'Content-Type': "application/x-www-form-urlencoded"
            },
            body:new URLSearchParams({
              image:item.img,
              brand:item.brand,
              detail:item.detail,
              price:item.rs,
              email:useremail.email
            })
          });
          const data= await response.text();
          if(data==='Product added to wishlist'){
            console.log('Product added to wishlist');
            setwishproducts(prev=>[...prev,item])
          }
      } 
      catch (error) {
         if(error){
          console.log(error);
         }
      }
  };

  const fetchwishlist=async(email)=>{
    try {
        const response=await fetch(`http://localhost:3000/getwishlist?email=${email}`,{
            method:'GET',
            headers:{
              'Content-Type': "application/json"
            }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data= await response.json();
        setwishproducts(data);
    }
    catch (error) {
        if(error){
          console.log(error);
        }
    }
  }

  

  const deletewish = async (item) => {
     try {
        const response= await fetch('http://localhost:3000/deletewishlist',{
          method:'DELETE',
          headers:{
            'Content=Type': "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            id:item.id,
            email:item.email
          })
        });
        const data= await response.text();
        if(data==='Product deleted successfully'){
          setwishproducts(prev=> prev.filter(product=> product.id !== item.id));
        }
     }
     
     catch (error) {
       console.log(error);
     }
  };

  const deletebag = async (item) => {
    try {
       const response= await fetch('http://localhost:3000/deleteproduct',{
        method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: item.id, email: useremail.email })
       });
       const data= await response.text();
       if(data==='Product deleted successfully'){
           setbagproducts(prev=> prev.filter(product=> product.id !== item.id));
       }
    }
    
    catch (error) {
        console.log(error);
    }
  }

  const handlesubmit = async (event, email, password) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          email: email,
          password: password
        })
      });
      const data = await response.text();
      setmessage(data);
      if (data === "Login success") {
        dispatchemail({
          type: "USER_LOGIN",
          payload: { email }
        });
        fetchproducts(email); // Fetch products after login
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    dispatchemail({ type: "USER_LOGOUT" });
  }

  const handlesubmitsdit = async (event, mobile, name, email, gender) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/edit', {
        method: 'POST',
        headers: {
          'Content-Type': "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          mobile: mobile,
          name: name,
          email: email,
          gender: gender
        })
      });

      const data = await response.text();
      seteditmessage(data);
      if (data === 'Details saved') {
        dispatchedit({
          type: "EDIT_SAVED",
          payload: { mobile, name, email, gender }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchuserdetails = async (email) => {
    try {
      const response = await fetch(`http://localhost:3000/userdetails?email=${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setuserdetails(data);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      setuserdetails({
        id: null,
        mobile: "",
        name: "",
        email: "",
        gender: ""
      });
    }
  };

  return (
    <Productcontext.Provider
      value={{
        products,
        addtobag,
        productwish,
        addtowishlist,
        movetobag,
        deletewish,
        deletebag,
        useremail,
        handlesubmit,
        message,
        logout,
        editdetails,
        handlesubmitsdit,
        editmessage,
        userdetails,
        fetchuserdetails,
        fetchproducts,
        bagproducts,
        fetchwishlist,
        wishproducts
      }}
    >
      {children}
    </Productcontext.Provider>
  );
}
