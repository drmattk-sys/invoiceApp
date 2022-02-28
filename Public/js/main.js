function generatePDF() {
	var doc = new jsPDF({ orientation: 'landscape'});
	doc.fromHTML(
		document.getElementById("pageToPdf"),
		15,
		15,
		{
			width: 300,
		},
		function (a) {
			doc.save("invoice.pdf");
		}
	);
}
