const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
	{
    
    InvoiceNo:{
      type: String,
			unique: true,
    },
		CustomerName: {
			type: String,
			required: true,
		},
		CustomerEmail: {
			type: String,
			required: true,
		},
		ItemName: {
			type: Array,
			required: true,
		},
		ItemPrice: {
			type: Array,
			required: true,
		},
		ItemQuantity: {
			type: Array,
			required: true,
		},
		StatusSend: {
			type: String,
			default: "Not Send",
		},
    StatusPaid:{
      type:String,
      default:"Not Paid",
    },
    DueDate:{
      type: Date,
      required:true,
    }
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
