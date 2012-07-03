<div class="detail">
<% if (_.any(lostTo)) { %>
<h2 title="these kittehs have beaten this kitteh more times than not - they definitely have some chops.">owned by</h2>

<ol>
	<% _.each(lostTo, function(opponent) { %>
		<li id="<%=opponent.id%>">
			<img src="<%=opponent.photo %>" />
			<div class="votes">won: <%=opponent.w %> / lost: <%=opponent.l %></div>
		</li>
	<% }); %>
</ol>
<% } %>

<% if (_.any(beat)) { %>
<h2 title="these other kittehs have their work cut out to catch up to this kitteh!">n00bs</h2>
<ol>
	<% _.each(beat, function(opponent) { %>
		<li data-id="<%=opponent.id%>">
			<img src="<%=opponent.photo %>" />
			<div class="votes">won: <%=opponent.w %> / lost: <%=opponent.l %></div>
		</li>
	<% }); %>
</ol>
</div>
<% } %>