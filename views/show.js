<header class="page-header">
  <h1>User Info</h1>
</header>

<div class="stats" style="border 2px solid black">
<pre>{{json user }}</pre>

<p>First Name: {{ user.fname }}</p>
<p>Last Name: {{ user.lname }}</p>
<p>Username: {{ user.username }}</p>
<p>Email: {{ user.email }}</p>
<p>About: {{user.profile.aboutme}}</p>
 <p>Talents:{{user.profile.talents}}</p>
 <p>Why should we meet:{{user.profile.whymessage}}</p>
 <p>Gender:{{user.profile.gender}}</p>
 <p>Marital Status:{{user.profile.martial}}</p>
 <p>height:{{user.profile.height}}</p>
 <p>Body Size:{{user.profile.body}}</p>
 <p>Children:{{user.profile.children}}</p>
 <p>Occupation:{{user.profile.occupation}}</p>
    



<a href="/users/{{ user.id }}/edit" class="btn btn-primary">Edit</a>
  <a href="/users/{{ user.id }}?_method=delete" class="btn btn-danger">Delete</a>
</header>

</div>