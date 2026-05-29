import bcrypt from "bcryptjs";

import prisma from "../config/prisma.js";


// SIGNUP

export const signup = async (req, res) => {

  try {

    const { name, email, password } = req.body;


    // CHECK IF USER EXISTS

    const existingUser = await prisma.user.findUnique({

      where: {
        email
      }

    });


    if (existingUser) {

      return res.status(400).json({

        message: "User already exists"

      });

    }


    // HASH PASSWORD

    const hashedPassword = await bcrypt.hash(password, 10);


    // CREATE USER

    const user = await prisma.user.create({

      data: {

        name,
        email,
        password: hashedPassword

      }

    });


    res.status(201).json({

      message: "Signup successful",

      user: {

        id: user.id,
        name: user.name,
        email: user.email

      }

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};


// LOGIN

export const login = async (req, res) => {

  try {

    const { email, password } = req.body;


    // FIND USER

    const user = await prisma.user.findUnique({

      where: {
        email
      }

    });


    if (!user) {

      return res.status(400).json({

        message: "User not found"

      });

    }


    // CHECK PASSWORD

    const isMatch = await bcrypt.compare(

      password,
      user.password

    );


    if (!isMatch) {

      return res.status(400).json({

        message: "Invalid password"

      });

    }


    res.status(200).json({

      message: "Login successful",

      user: {

        id: user.id,
        name: user.name,
        email: user.email

      }

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};