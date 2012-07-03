<% _.each(kittehs, function(kitteh) { %> 
	<li id="<%=kitteh.id%>">
		<img src="<%=kitteh.photo %>" /> 
		<div class="votes" title="votes"><%=kitteh.totalVotes %></div>
	</li> 
<% }); %>
