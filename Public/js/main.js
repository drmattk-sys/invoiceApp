function generatePDF() {
	var doc = new jsPDF({ orientation: 'landscape'});
	doc.fromHTML(
		document.getElementById("invoice-form"),
		15,
		15,
		{
			width:100 ,
		},
		function (a) {
			doc.save("invoice.pdf");
		}
	);
}
