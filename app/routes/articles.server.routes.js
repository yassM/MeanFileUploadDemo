'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	articles = require('../../app/controllers/articles');
var multer =require('multer');
var fileHandler =require('../../app/controllers/local-file-handle');
var multerTemp=multer({ dest: config.filesTemp, limits: {
	fieldNameSize: 255,
	fields: 7,
	files: 1,
	fileSize:100000
}});

module.exports = function(app) {
	// Article Routes
	app.route('/articles')
		.get(articles.list)
		.post(users.requiresLogin, multerTemp, articles.create, fileHandler.uploadFile);

	app.route('/articles/:articleId')
		.get(articles.read)
		.put(users.requiresLogin, articles.hasAuthorization, articles.update)
		.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

	// Finish by binding the article middleware
	app.param('articleId', articles.articleByID);
};
