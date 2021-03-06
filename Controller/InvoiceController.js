const mongoose = require("mongoose");
const Invoice = require("../Database/schema/Invoice");
const moment = require("moment");
exports.addInvoice = async (req, res) => {

  console.log(req.body);
	try {
		const NewInvoice = await new Invoice({
			InvoiceNo: req.body.invoiceNumber,
			CustomerName: req.body.customerName,
			CustomerEmail: req.body.customerEmail,
      CustomerAddress:req.body.customerAddress,
      itemCode:req.body.productCode,
			ItemName: req.body.productName,
			ItemPrice: req.body.price,
			ItemQuantity: req.body.quantity,
      itemTotal:req.body. total,
      subTotal:req.body.subTotal,
      taxRates:req.body.taxRate,
      totalAmount:req.body.taxAmount,
      totalAftertax:req.body.totalAftertax,
      amountPaid:req.body.amountPaid,
      amountDue:req.body.amountDue,
      note:req.body.notes,
      date:req.body.date,
			DueDate: req.body.dueDate,
		});
		await NewInvoice.save();
		req.flash("msg", "You have successfully create or generator an Invoice");
		res.redirect("/home");
	} catch (error) {
		console.log(error);
		req.flash(
			"msg",
			"You have not successfully create or generator an Invoice"
		);
		req.flash("data", req.body);
		res.redirect("/add/invoice");
	}
};

exports.getInvoice = async (req, res) => {
	try {
		const invoices = await Invoice.find({}).sort({ _id: -1 }).exec();

		res.render("index", {
			title: "Invoice App",
			invoices: invoices,
			message: req.flash("msg"),
		});
	} catch (error) {}
};

exports.getOneInvoice = async (req, res) => {
	try {
		const InvoiceId = req.params.id;
		const GetOneInvoice = await Invoice.findOne({ _id: InvoiceId });
		res.render("editInvoice", {
			title: "edit The Invoice",
			invoice: GetOneInvoice,
			message: req.flash("msg"),
		});
	} catch (error) {}
};

exports.updateInvoice = async (req, res) => {
	try {
		const InvoiceId = req.params.id;
		await Invoice.findByIdAndUpdate(InvoiceId, {
			InvoiceNo: req.body.invoiceNumber,
			CustomerName: req.body.customerName,
			CustomerEmail: req.body.customerEmail,
      CustomerAddress:req.body.customerAddress,
      itemCode:req.body.productCode,
			ItemName: req.body.productName,
			ItemPrice: req.body.price,
			ItemQuantity: req.body.quantity,
      itemTotal:req.body. total,
      subTotal:req.body.subTotal,
      taxRates:req.body.taxRate,
      totalAmount:req.body.taxAmount,
      totalAftertax:req.body.totalAftertax,
      amountPaid:req.body.amountPaid,
      amountDue:req.body.amountDue,
      note:req.body.notes,
      date:req.body.date,
			DueDate: req.body.dueDate,
		});
		req.flash("msg", "You have successfully Update an Invoice");
		res.redirect(`/edit/${InvoiceId}`);
	} catch (error) {
		console.log(error);
		req.flash("msg", "You have not successfully Update an Invoice");
		res.redirect(`/edit/${req.params.id}`);
	}
};

exports.deleteInvoice = async (req, res, next) => {
	try {
		const InvoiceId = req.params.id;
		await Invoice.findByIdAndRemove({ _id: InvoiceId });
		req.flash("msg", "You have Successfully Delete Your Invoice");
		next();
	} catch (error) {
		console.log(error);
		next();
	}
};

exports.printInvoice = async (req, res) => {
	try {
		const InvoiceId = req.params.id;
		const GetOneInvoice = await Invoice.findOne({ _id: InvoiceId });
		const date = moment(GetOneInvoice.DueDate).format("LL");
		res.render("printInvoice", {
			title: "Print the Invoice",
			invoice: GetOneInvoice,
			DueDate: date,
			mode: req.flash("mode"),
      moment: moment,
		});
	} catch (error) {
		console.log(error);
	}
};

exports.sendInvoice = async (req, res) => {
	try {
		const InvoiceId = req.params.id;
		const check = await Invoice.findOne({ _id: InvoiceId }).where({
			StatusSend: "Send",
		});
		if (check) {
			req.flash("msg", "You have Already sent the Invoice to the Customer ");
			res.redirect("/home");
		} else {
			await Invoice.findByIdAndUpdate(InvoiceId, {
				StatusSend: "Send",
			});
			req.flash(
				"msg",
				"You have successfully sent the Invoice to the Customer"
			);
			res.redirect("/home");
		}
	} catch (error) {
		console.log(error);
		res.redirect("/home");
	}
};

exports.paidInvoice = async (req, res) => {
	try {
		const InvoiceId = req.params.id;
		const check = await Invoice.findOne({ _id: InvoiceId }).where({
			StatusPaid: "Paid",
		});

		if (check) {
			req.flash("msg", "You have Already paid The Amount Due");
			res.redirect(`/payment/${req.params.id}`);
		} else {
			await Invoice.findByIdAndUpdate(InvoiceId, {
				StatusPaid: "Paid",
			});
			req.flash("msg", "You have successfully paid The Amount Due");
			res.redirect(`/payment/${req.params.id}`);
		}
	} catch (error) {
		console.log(error);
		req.flash("msg", "You have Not successfully paid The Amount Due");
		res.redirect(`/payment/${req.params.id}`);
	}
};

exports.getAllInvoice = async (req, res) => {
	try {
		const invoices = await Invoice.find({}).where({StatusSend: "Send",}).sort({ _id: -1 }).exec();
		res.render("paymentPage", {
			title: "Payment Page",
			invoices: invoices,
			message: req.flash("msg"),
			moment: moment,
		});
	} catch (error) {
		console.log(error);
	}
};

exports.getPayment = async (req, res) => {
	try {
		const InvoiceId = req.params.id;
		const GetOneInvoice = await Invoice.findOne({ _id: InvoiceId });
		res.render("paymentProcess", {
			title: "payment Process",
			invoice: GetOneInvoice,
			message: req.flash("msg"),
			moment: moment,
		});
	} catch (error) {
		console.log(error);
	}
};
