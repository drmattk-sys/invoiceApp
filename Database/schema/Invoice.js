const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
	{
    
    InvoiceNo:{
      type: String,
		  required:true,
    },
		CustomerName: {
			type: String,
			required: true,
		},
		CustomerEmail: {
			type: String,
			required: true,
		},
    CustomerAddress:{
      type:String,
      required: true,
    },
		ItemName: {
			type: Array,
			required: true,
		},
    itemCode:{
      type:Array,
      required:true,
    },
		ItemPrice: {
			type: Array,
			required: true,
		},
		ItemQuantity: {
			type: Array,
			required: true,
		},
   itemTotal:{
     type:Array,
     required:true,
   },

   subTotal:{
     type:Number,
     required:true
   },
   taxRates:{
     type:Number,
   },
   totalAmount:{
     type:Number,
   },
   totalAftertax:{
    type:Number,
  },
  amountPaid:{
    type:Number,
  },
  amountDue:{
    type:Number,
  },
   note:{
   type:String
   },
    DueDate:{
      type: Date,
      required:true,
    },
    date:{
      type:Date,
      required:true,
    },
    StatusSend: {
			type: String,
			default: "Not Send",
		},
    StatusPaid:{
      type:String,
      default:"Not Paid",
    },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
