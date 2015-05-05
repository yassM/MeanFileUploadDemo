'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles','Upload',
	function($scope, $stateParams, $location, Authentication, Articles, Upload) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			var blob=null;
            if($scope.attachment&&$scope.attachment.length){
                console.log('has files');
				article.hasAttachment=true;
				blob=$scope.attachment;
				console.log(blob)
            }
			console.log(article);
			var newArticle = angular.fromJson(angular.toJson(article));
			console.log(newArticle);
			Upload.upload({
				url: '/articles',
				method: 'POST',
				headers: {'Content-Type': 'multipart/form-data'},
				data: newArticle,
				file: blob,
				fileName: 'attachment' // to modify the name of the file(s)
			}).success(function (response, status) {
					//success
					console.log('Article created successfully');
					$scope.title = '';
					$scope.content = '';
					$scope.attachment=null;
				}
			).error(function (err) {
					//error
					console.log(err.message);
				}
			);
			/*article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});*/
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);
