module.exports = {
	 async home(req, res) {
		req.session.nome="Tiago",
		res.render('pages/home')
	  }
}
