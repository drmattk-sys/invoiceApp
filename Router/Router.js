const express = require("express");
const router = express.Router();
const InvoiceController = require("../Controller/InvoiceController");

router.get("/", (req, res) => {
	res.redirect("/home");
});

router.get("/home", InvoiceController.getInvoice);

router.get("/add/invoice", (req, res) => {
	res.render("addInvoice", { title: "Add Invoice", message: req.flash("msg") });
});

router.post("/add/invoice", InvoiceController.addInvoice, (req, res) => {
	res.redirect("/add/invoice");
});

router.get("/delete/:id", InvoiceController.deleteInvoice, (req, res) => {
	res.redirect("/home");
});

router.get("/edit/:id", InvoiceController.getOneInvoice);
router.post("/edit/:id", InvoiceController.updateInvoice);

router.get("/print/:id", InvoiceController.printInvoice);

router.get("/send/:id", InvoiceController.sendInvoice);
router.get("paid/:id", InvoiceController.paidInvoice);

module.exports = router;
