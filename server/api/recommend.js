var express = require('express');
var router = express.Router();
var rec = require('../service/recommend/recommend');
var jwtauth = require('../common/jwtauth');
router.route('/')
.post(function(req,res){
	rec.recommendSave(req).then(result => res.json(result));
})
.get((req,res) => {
	const page = req.query.page;
	rec.recommendGet(page).then((recommend)=>{
		res.json(recommend);
	}).catch(e => res.json(e));

});

router.route('/single')
.get((req,res) => {
	rec.recommendGetSingle(req.query.id).then(recommend => {
		res.json(recommend);
	}).catch(e => res.json(e));
});

router.route('/types')
.get((req,res) => {
	rec.recommendGetByTypes(req.query.type,req.query.page).then(recommend => {
		res.json(recommend);
	}).catch(e => res.json(e));
});

router.route('/typeCount')
.get((req, res) => {
	rec.recommendGetTypeCount().then(count => {
		res.json(count);
	}).catch(e => res.json(e));
});

router.route('/count')
.get((req,res)=> {
	rec.recommendGetCount().then(count => {
		res.json(count);
	}).catch(e => res.json(e));
})

module.exports = router;