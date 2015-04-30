!function(){"use strict";define("app/github/module",["require","angular","angularResource","angularRoute"],function(e){var a=e("angular");return e("angularResource"),e("angularRoute"),a.module("github",["ngResource","ngRoute"])}),define("app/github/resource",["require","./module"],function(e){function a(e){return e("https://api.github.com/:query/:user/:repo/:spec",{query:"users",user:"erkobridee",repo:"repos",spec:"",callback:"JSON_CALLBACK",per_page:100},{get:{method:"JSONP"}})}var r=e("./module");r.factory("GithubResource",a),a.$inject=["$resource"]}),define("app/github/controllers/repository",["require","../module"],function(e){function a(e,a,r,t){function i(e){var a,r="Contribution";return e.contributions>1&&(r+="s"),a=e.login+" has "+e.contributions+" "+r}function o(){a.get({query:"repos",user:s,repo:l},function(e){u.repoInfo=e}),a.get({query:"repos",user:s,repo:l,spec:"contributors"},function(e){u.contributors=e})}var s=e.user,l=e.repo,n=["","github",s,l,""].join("/"),u=this;u.repoInfo=null,u.contributors=null,u.watchForms=t.watchForms,u.forkForms=t.forkForms,u.contributionsTitle=i,r.updateSearchUrl(n),o()}var r=e("../module");r.controller("GitHubRepositoryCtrl",a),a.$inject=["$routeParams","GithubResource","NavBarService","PluralizeService"]}),define("app/github/controllers/user",["require","../module"],function(e){function a(e,a,r,t){function i(e){for(var a in e)return e[a]}function o(e){return"undefined"!=typeof e&&e.hasOwnProperty("length")?"("+e.length+")":"(0)"}function s(){a.get({user:l,repo:""},function(e){u.user=e}),a.get({user:l},function(e){u.repos=e}),a.get({user:l,repo:"gists"},function(e){u.gists=e})}var l=e.user,n=["","github",l,""].join("/"),u=this;u.user=null,u.repos=null,u.gists=null,u.publicRepoForms=t.publicRepoForms,u.followerForms=t.followerForms,u.watchForms=t.watchForms,u.forkForms=t.forkForms,u.getFile=i,u.checkLength=o,r.updateSearchUrl(n),s()}var r=e("../module");r.controller("GitHubUserCtrl",a),a.$inject=["$routeParams","GithubResource","NavBarService","PluralizeService"]}),define("app/github/routes",["require","./module"],function(e){function a(e){e.when("/github/:user",{templateUrl:"app/github/templates/user.html",controller:"GitHubUserCtrl",controllerAs:"vm"}).when("/github/:user/:repo/",{templateUrl:"app/github/templates/repo.html",controller:"GitHubRepositoryCtrl",controllerAs:"vm"})}var r=e("./module");r.config(a),a.$inject=["$routeProvider"]}),define("app/github/package",["require","./module","./resource","./controllers/repository","./controllers/user","./routes"],function(e){var a=e("./module");return e("./resource"),e("./controllers/repository"),e("./controllers/user"),e("./routes"),a}),define("app/components/module",["require","angular"],function(e){var a=e("angular");return a.module("components",[])}),define("app/components/directives/navbar",["require","../module"],function(e){function a(){function e(e){var a=this;a.nav=e.getNav()}function a(){return"app/components/templates/navbar.html"}var r={title:"@"},t={restrict:"E",scope:r,controller:e,controllerAs:"vm",bindToController:!0,templateUrl:a};return e.$inject=["NavBarService"],t}var r=e("../module");r.directive("navbar",a)}),define("app/components/directives/pane",["require","../module"],function(e){function a(){function e(e,a,r,t){t.addPane(e)}function a(){return"app/components/templates/pane.html"}var r={title:"@"},t={require:"^tabs",restrict:"E",scope:r,link:e,transclude:!0,templateUrl:a};return t}var r=e("../module");r.directive("pane",a)}),define("app/components/directives/tabs",["require","../module"],function(e){function a(){function e(){function e(e){angular.forEach(r.panes,function(e){e.selected=!1}),e.selected=!0}function a(e){0===r.panes.length&&r.select(e),r.panes.push(e)}var r=this;r.panes=[],r.select=e,r.addPane=a}function a(){return"app/components/templates/tabs.html"}var r={},t={restrict:"E",scope:r,transclude:!0,controller:e,controllerAs:"vm",bindToController:!0,templateUrl:a};return e.$inject=["NavBarService"],t}var r=e("../module");r.directive("tabs",a)}),define("app/components/package",["require","./module","./directives/navbar","./directives/pane","./directives/tabs"],function(e){var a=e("./module");return e("./directives/navbar"),e("./directives/pane"),e("./directives/tabs"),a}),define("app/main/module",["require","angular","angularResource","angularRoute","app/github/package","app/components/package"],function(e){var a=e("angular");return e("angularResource"),e("angularRoute"),a.module("main",["ngResource","ngRoute",e("app/github/package").name,e("app/components/package").name])}),define("app/main/services/navbar",["require","../module"],function(e){function a(){function e(){return i}function a(){i.searchNotActive="",i.aboutNotActive="x"}function r(){i.showForkBelt="yes",i.searchNotActive="x",i.aboutNotActive=""}function t(e){i.showForkBelt="/"===e?"yes":void 0,i.searchUrlPath=e,a()}var i={showForkBelt:"yes",searchUrlPath:"/",searchNotActive:"",aboutNotActive:"x"},o={getNav:e,searchPageSelected:a,aboutPageSelected:r,updateSearchUrl:t};return o}var r=e("../module");r.factory("NavBarService",a)}),define("app/main/services/pluralize",["require","../module"],function(e){function a(){var e={publicRepoForms:{1:"Public Repo",other:"Public Repos"},followerForms:{1:"Follower",other:"Followers"},watchForms:{1:"Watcher",other:"Watchers"},forkForms:{1:"Fork",other:"Forks"}};return e}var r=e("../module");r.factory("PluralizeService",a)}),define("app/main/controllers/about",["require","../module"],function(e){function a(e){var a=this;a.pageName="About this application",e.aboutPageSelected()}var r=e("../module");r.controller("AboutCtrl",a),a.$inject=["NavBarService"]}),define("app/main/controllers/search",["require","../module"],function(e){function a(e,a){function r(){var a=t.searchField||"erkobridee";e.path(["","github",a,""].join("/"))}var t=this;t.searchField="",t.searchAction=r,a.updateSearchUrl("/")}var r=e("../module");r.controller("SearchCtrl",a),a.$inject=["$location","NavBarService"]}),define("app/main/routes",["require","./module"],function(e){function a(e){e.when("/",{templateUrl:"app/main/templates/search.html",controller:"SearchCtrl",controllerAs:"vm"}).when("/about",{templateUrl:"app/main/templates/about.html",controller:"AboutCtrl",controllerAs:"vm"}).otherwise({redirectTo:"/"})}var r=e("./module");r.config(a),a.$inject=["$routeProvider"]}),define("app/main/templatesCache.js",["require","./module"],function(e){function a(e){e.put("app/github/templates/repo-contributors.html",'<hr><div><h3>Project Contributors ({{vm.contributors.data.length}})</h3><ul class=contributors><li class=contributor ng-repeat="contributor in vm.contributors.data"><a class=avatar ng-href="#/github/{{contributor.login}}/" title={{contributionsTitle(contributor)}}><img alt="{{contributor.login}}\'s avatar" ng-src="{{contributor.avatar_url}}"> <span class=name>{{contributor.login}}</span> <span class=contributions>{{contributor.contributions}}</span></a></li></ul></div>'),e.put("app/github/templates/repo-info.html",'<ul class=breadcrumb><li><i class=icon-search></i> <a href="#/">Search Other</a></li><li><a href=#github/{{vm.repoInfo.data.owner.login}}>{{vm.repoInfo.data.owner.login}}</a></li><li class=active>{{vm.repoInfo.data.name}}</li><p class="hidden-xs pull-right"><a href={{vm.repoInfo.data.html_url}} target=_blank>View on GitHub</a> <i class="glyphicon glyphicon-eye-open"></i></p></ul><div class="row user"><div class=visible-xs><div class="row login-mobile"><div><span class="avatar user-avatar"><img ng-src={{vm.repoInfo.data.owner.avatar_url}} alt="{{vm.repoInfo.data.owner.login}}\'s avatar"></span></div><div><h2>{{vm.repoInfo.data.owner.login}}</h2><h2><small>({{vm.repoInfo.data.name}})</small></h2></div></div></div><div class="hidden-xs col-md-6"><div class=login><div><span class="avatar user-avatar"><img ng-src={{vm.repoInfo.data.owner.avatar_url}} alt="{{vm.repoInfo.data.owner.login}}\'s avatar"></span></div><div><h2>{{vm.repoInfo.data.owner.login}}</h2><h2><small>({{vm.repoInfo.data.name}})</small></h2></div></div></div><div class=visible-xs><div class="row info-repo-mobile"><ul><li><h1>{{vm.repoInfo.data.watchers}}</h1><ng-pluralize count=vm.repoInfo.data.watchers when=vm.watchForms></ng-pluralize></li><li><h1>{{vm.repoInfo.data.forks}}</h1><ng-pluralize count=vm.repoInfo.data.forks when=vm.forkForms></ng-pluralize></li></ul></div><div class="row text-center"><br><p><a href={{vm.repoInfo.data.html_url}} target=_blank>View on GitHub</a> <i class="glyphicon glyphicon-eye-open"></i></p><br></div></div><div class="hidden-xs col-md-6"><div class="pull-right well info"><ul><li><h1>{{vm.repoInfo.data.watchers}}</h1><ng-pluralize count=vm.repoInfo.data.watchers when=vm.watchForms></ng-pluralize></li><li><h1>{{vm.repoInfo.data.forks}}</h1><ng-pluralize count=vm.repoInfo.data.forks when=vm.forkForms></ng-pluralize></li></ul></div></div></div><div ng-show=vm.repoInfo.data.description><hr><h4>Description:</h4><span class=repo-desc>{{vm.repoInfo.data.description}}</span></div>'),e.put("app/github/templates/repo.html","<div ng-hide=vm.repoInfo.data><p style=text-align:center><img src=img/loading.gif></p></div><div ng-show=vm.repoInfo.data><div class=row ng-include=\"'app/github/templates/repo-info.html'\"></div><div class=row ng-include=\"'app/github/templates/repo-contributors.html'\"></div></div>"),e.put("app/github/templates/user-gists.html",'<div ng-show=vm.gists.data.length class=container><div class=row><div class="row repo" ng-repeat="gist in vm.gists.data | orderBy:\'-updated_at\'"><ul class=name><li><h4><a ng-href="{{gist.html_url}}/" target=_blank>{{vm.getFile(gist.files).filename}}</a></h4><span class="visible-desktop line-desc" ng-show=gist.description>{{gist.description}}</span></li></ul><div class="pull-right stats"><ul><li class=lang><b>{{vm.getFile(gist.files).language}}</b></li></ul></div></div></div></div>'),e.put("app/github/templates/user-info.html",'<div class=row><ul class=breadcrumb><li><i class=icon-search></i> <a href="#/">Search Other</a></li><li class=active>{{vm.user.data.login}}</li><p class="hidden-xs pull-right"><a href={{vm.user.data.html_url}} target=_blank>View on GitHub</a> <i class="glyphicon glyphicon-eye-open"></i></p></ul></div><div class="row user"><div class=visible-xs><div class="row login-mobile"><div><span class="avatar user-avatar"><img ng-src={{vm.user.data.avatar_url}} alt="{{vm.user.data.login}}\'s avatar"></span></div><div><h2>{{vm.user.data.login}}</h2><h2 ng-show=vm.user.data.name><small>({{vm.user.data.name}})</small></h2></div></div></div><div class="hidden-xs col-md-6"><div class=login><div><span class="avatar user-avatar"><img ng-src={{vm.user.data.avatar_url}} alt="{{vm.user.data.login}}\'s avatar"></span></div><div><h2>{{vm.user.data.login}}</h2><h2 ng-show=vm.user.data.name><small>({{vm.user.data.name}})</small></h2></div></div></div><div class="visible-xs row"><div class="row info-mobile"><ul><li><h1>{{vm.user.data.public_repos}}</h1><ng-pluralize count=vm.user.data.public_repos when=vm.publicRepoForms></ng-pluralize></li><li><h1>{{vm.user.data.followers}}</h1><ng-pluralize count=vm.user.data.followers when=vm.followerForms></ng-pluralize></li></ul></div><div class="row text-center"><br><p><a href={{vm.user.data.html_url}} target=_blank>View on GitHub</a> <i class="glyphicon glyphicon-eye-open"></i></p><br></div><hr></div><div class="hidden-xs col-md-6"><div class="pull-right well info"><ul><li><h1>{{vm.user.data.public_repos}}</h1><ng-pluralize count=vm.user.data.public_repos when=vm.publicRepoForms></ng-pluralize></li><li><h1>{{vm.user.data.followers}}</h1><ng-pluralize count=vm.user.data.followers when=vm.followerForms></ng-pluralize></li></ul></div></div></div>'),e.put("app/github/templates/user-repos.html",'<div ng-show=vm.repos.data.length class=container><div class=row><div class="row repo" ng-repeat="repo in vm.repos.data | orderBy:\'-watchers\'"><ul class=name><li><h4><a href="#/github/{{repo.full_name}}/">{{repo.name}}</a></h4><span class="visible-desktop line-desc" ng-show=repo.description>{{repo.description}}</span></li></ul><div class="pull-right stats"><ul><li class=lang><b>{{repo.language}}</b></li><li class=watchers><b>{{repo.watchers}}</b> <span><ng-pluralize count=repo.watchers when=vm.watchForms></ng-pluralize></span></li><li class=forks><b>{{repo.forks}}</b> <span><ng-pluralize count=repo.forks when=vm.forkForms></ng-pluralize></span></li></ul></div></div></div></div>'),e.put("app/github/templates/user.html",'<div class=container><div ng-hide=vm.user.data><p style=text-align:center><img src=img/loading.gif></p></div><div class=row ng-show=vm.user.data.message><ul class=breadcrumb><li><i class=icon-search></i> <a href="#/">Search Other</a></li></ul><div class=userNotFound></div><p style=text-align:center>{{vm.user.data.message}}</p></div><div ng-show=vm.user.data.login><div class=row ng-include="\'app/github/templates/user-info.html\'"></div><div class=row><tabs><pane title="Public Repositories {{vm.checkLength(vm.repos.data)}}"><div ng-include="\'app/github/templates/user-repos.html\'"></div></pane><pane title="Public Gists {{vm.checkLength(vm.gists.data)}}"><div ng-include="\'app/github/templates/user-gists.html\'"></div></pane></tabs></div></div></div>'),e.put("app/components/templates/navbar.html",'<div><div class="navbar navbar-default navbar-fixed-top" role=navigation><div class=container><div class=navbar-header><button type=button class=navbar-toggle data-toggle=collapse data-target=.navbar-collapse><span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a class=navbar-brand href="#/">{{vm.title}}</a></div><div class="navbar-collapse collapse"><ul class="nav navbar-nav"><li class={{vm.nav.searchNotActive}}active><a ng-href=#{{vm.nav.searchUrlPath}}><i class="icon-search icon-white"></i> Search</a></li><li class={{vm.nav.aboutNotActive}}active><a href=#/about><i class="icon-question-sign icon-white"></i> About</a></li></ul></div></div></div></div>'),e.put("app/components/templates/pane.html",'<div class=tab-pane ng-class="{active: selected}" ng-transclude></div>'),e.put("app/components/templates/tabs.html",'<div class=tabbable><ul class="visible-xs nav nav-pills nav-justified nav-stacked"><li ng-repeat="pane in vm.panes" ng-class={active:pane.selected}><a href="" ng-click=vm.select(pane)>{{pane.title}}</a></li></ul><ul class="hidden-xs nav nav-tabs"><li ng-repeat="pane in vm.panes" ng-class={active:pane.selected}><a href="" ng-click=vm.select(pane)>{{pane.title}}</a></li></ul><div class=tab-content ng-transclude></div></div>'),e.put("app/main/templates/about.html",'<div class=row><h1>{{vm.pageName}}</h1></div><div class=row><p>&nbsp;</p><p>This application is based on: <i>AngularJS GitHub Contributors</i> (<a href="http://daha.github.com/angularJS-github-contributors/" target=_blank>App</a> | <a href="https://github.com/daha/angularJS-github-contributors/" target=_blank>GitHub</a>)</p><p><br></p><p>Application (<a href=https://github.com/erkobridee/angularjs-github-info target=_blank>Code on GitHub</a> | <a href="http://erkobridee.mit-license.org/" target=_blank>MIT License</a>)</p><ul class=techs><li><b>Interface:</b> <a href="http://getbootstrap.com/" target=_blank>Twitter Bootstrap v3.0.3</a></li><li><b>Engine:</b> <a href="http://angularjs.org/" target=_blank>AngularJS v1.3.15</a> (<a href="http://docs.angularjs.org/guide/" target=_blank>Guide</a>)</li><li><b>Features:</b> List all public repositories, public gists and contributors repository from some GitHub user</li><li><b>Data Access:</b> <a href="http://developer.github.com/" target=_blank>GitHub API</a></li><li><b>URLs examples accessing GitHub API:</b><ul><li>User Info: <a href=https://api.github.com/users/erkobridee target=_blank>https://api.github.com/users/erkobridee</a></li><li>User public gists: <a href=https://api.github.com/users/erkobridee/gists target=_blank>https://api.github.com/users/erkobridee/gists</a></li><li>User public repositories: <a href=https://api.github.com/users/erkobridee/repos target=_blank>https://api.github.com/users/erkobridee/repos</a></li><li>Repository Info: <a href=https://api.github.com/repos/erkobridee/Twitter-Analyzer target=_blank>https://api.github.com/repos/erkobridee/Twitter-Analyzer</a></li><li>Repository Contributors: <a href=https://api.github.com/repos/erkobridee/Twitter-Analyzer/contributors target=_blank>https://api.github.com/repos/erkobridee/Twitter-Analyzer/contributors</a></li></ul></li></ul></div><br><div class=row><iframe src="http://ghbtns.com/github-btn.html?user=erkobridee&repo=angularjs-github-info&type=watch&count=true" allowtransparency=true frameborder=0 scrolling=0 width=110 height=20></iframe><iframe src="http://ghbtns.com/github-btn.html?user=erkobridee&repo=angularjs-github-info&type=fork&count=true" allowtransparency=true frameborder=0 scrolling=0 width=95 height=20></iframe><iframe src="http://ghbtns.com/github-btn.html?user=erkobridee&type=follow&count=true" allowtransparency=true frameborder=0 scrolling=0 width=165 height=20></iframe></div>'),e.put("app/main/templates/search.html",'<div class=col-md-12><div class="col-md-8 col-lg-offset-2 jumbotron"><h3>GitHub user:</h3><form ng-submit=vm.searchAction()><div class=input-group><input class=form-control id=searchField placeholder="ex.: erkobridee" ng-model=vm.searchField> <span class=input-group-btn><button class="btn btn-default" type=submit><i class="glyphicon glyphicon-search"></i> Search</button></span></div></form><small>Public Repositories and Gists</small></div></div>')}var r=e("./module");r.run(a),a.$inject=["$templateCache"]}),define("app/main/package",["require","./module","./services/navbar","./services/pluralize","./controllers/about","./controllers/search","./routes","./templatesCache.js"],function(e){var a=e("./module");return e("./services/navbar"),e("./services/pluralize"),e("./controllers/about"),e("./controllers/search"),e("./routes"),e("./templatesCache.js"),a}),define("ng.app",["require","angular","app/main/package"],function(e){function a(){var a=r.module("run",[e("app/main/package").name]);r.bootstrap(document,[a.name])}var r=e("angular");r.element(document).ready(a)})}();
require({paths:{jquery:["vendor/jquery/jquery.min"],bootstrap:["vendor/bootstrap/js/bootstrap.min"],angular:["vendor/angular/angular.min"],angularResource:["vendor/angular-resource/angular-resource.min"],angularRoute:["vendor/angular-route/angular-route.min"]},shim:{bootstrap:{deps:["jquery"]},angular:{deps:["bootstrap"],exports:"angular"},angularResource:{deps:["angular"]},angularRoute:{deps:["angular"]}},priority:["angular"],deps:["./ng.app"]});