const { z } = require("zod");

const loginSchema = z.object({
    email: z.string({ required_error: "Email is required" }).trim().email({ message: "Invalid email address" }),
    password: z.string({ required_error: "Password is required" }).trim().min(6, "Password must be at least 6 characters long"),
});

const signupSchema = z.object({
    email: z.string({ required_error: "Email is required" }).trim().email({ message: "Invalid email address" }),
    password: z.string({ required_error: "Password is required" }).trim().min(6, "Password must be at least 6 characters long"),
    phoneNumber: z.string({ required_error: "Phone number is required" }).min(10, "Phone number must be at least 10 characters long").max(10, "Phone number must be at most 10 characters long"),
    name: z.string({ required_error: "Name is required" }).trim().min(2, "Name must be at least 2 characters long"),
    type: z.string({ required_error: "Type is required" }).trim(),
    // city: z.string({ required_error: "City is required" }).trim(),
    // country: z.string({ required_error: "Country is required" }).trim(),
    // state: z.string({ required_error: "State is required" }).trim(),
    zipCode: z.string({ required_error: "Zip code is required" }).trim(),
});

const sendVerificationMailSchema = z.object({
    email: z.string({ required_error: "Email or userid is required" }).trim().email({ message: "Invalid email address" })
})

const otpVerificationSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
    otp: z.string({ required_error: "OTP is required" }).min(6, "OTP must be 6 characters long").max(6, "OTP must be 6 characters long")
})

const sendOTPSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" })
})

const updateUserSchema = z.object({
    name: z.string().optional(),
    dob: z.string().optional(),
    location: z.object({
        city: z.string().optional(),
        country: z.string().optional()
    }).optional(),
    workDetails: z.object({
        position: z.string().optional(),
        company: z.string().optional(),
    }).optional(),
})

const setupProfileSchema = z.object({
    name: z.string({ required_error: "name is required" }).trim().min(2, "Name must be at least 2 characters long"),
    dob: z.string({ required_error: "Date of Birth is required" }).datetime({ message: "Invalid date of birth" }),
    location: z.object({
        city: z.string({ required_error: "location.city is required" }).trim(),
        country: z.string({ required_error: "location.country is required" }).trim(),
    }, { required_error: "location is required" }),
    workDetails: z.object({
        position: z.string({ required_error: "workDetails.position is required" }).trim(),
        company: z.string({ required_error: "workDetails.company is required" }).trim(),
    }, { required_error: "workDetails is required" }),
});

const schedulePickupSchema = z.object({
    date: z.string({ required_error: "Date is required" }).datetime({ message: "Invalid date" }),
    items: z.array(z.object({
        name: z.string({ required_error: "Item name is required" }),
        quantity: z.number({ required_error: "Quantity is required" }).int().positive({ message: "Quantity must be a positive integer" })
    })).nonempty({ message: "Items array cannot be empty" }),
    recyclerId: z.string({ required_error: "Recycler ID is required" }),
});

module.exports = {
    loginSchema,
    signupSchema,
    otpVerificationSchema,
    sendOTPSchema,
    updateUserSchema,
    setupProfileSchema,
    sendVerificationMailSchema,
    schedulePickupSchema
}