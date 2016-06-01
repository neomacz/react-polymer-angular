'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:commentList
 * @description
 * # commentList
 */
angular.module('commentList', ['comment'])
  .directive('commentList', function () {
    return {
      template: '<div class="commentList">' +
                  '<comment-model ng-repeat="comment in comments" author="{{comment.author}}">' +
                    '{{comment.msg}}' + '<p>Posted {{calculateTimeLapse(comment.posted)}} ago.</p>' +
                  '</comment-model>' +
                  '<span ng-if="comments.length < 1">No comments yet</span>' +
                '</div>',
      restrict: 'E',
      scope: {
        comments: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.calculateTimeLapse = function(timePosted){
            var dateNow = new Date();
            var secondDifference = (dateNow.getTime() - timePosted) /1000;
            var calculatedTimePosted, timeUnit; 

            if (secondDifference < 59)
            {
              calculatedTimePosted = '1';
              timeUnit = 'minute'
            }
            else if (secondDifference < (60 * 59))
            {
              calculatedTimePosted = Math.floor(secondDifference /60);
              timeUnit = 'minute'
            }
            else if (secondDifference < (60 * 1439))
            {
              calculatedTimePosted = Math.floor(secondDifference /3600);
              timeUnit = 'hour'
            }
            else
            {
              calculatedTimePosted = Math.floor(secondDifference /86400);
              timeUnit = 'day'
            }

            if (calculatedTimePosted > 1)
              timeUnit = timeUnit + 's';



            return calculatedTimePosted + ' ' + timeUnit;
          

          
          
        }
      }
    };
  });
