<% _.each(kittehs, function(kitteh) { %> 
	<li id="<%=kitteh.id %>">
		<img src="<%=kitteh.photo %>" /> 
		<div class="votes" title="score"><%=kitteh.score %> / 100</div>
	</li> 
<% }); %>
<li>Total matchups: <%=  _.reduce(kittehs, function (left, kitteh) { return left + kitteh.totalVotes; }, 0) %></li>