(function(){
    const search=document.getElementById("search");
    const profile=document.getElementById("profile");
    const url= "https://api.github.com/users";
    const client_id="dec7bf3658948267c941";
    const client_secret="1ffaf43bb7c28842003395f973fae9d3d4174eba";
    const count= 7;
    const sort = "created: asc"
    
    async function getUser(user){
        const profileResponse = await fetch (`${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`
        
        );

        const reposResponse = await fetch (`${url}/${user}/repos?per_page=${count}&sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`
        
        );
        const profile= await profileResponse.json();
        const repos = await reposResponse.json();
    
        return {profile,repos};
    
    }
    
    function showProfile(user){
        
    profile.innerHTML = `<div class="row">
    <div class="col-md-4">
    <div class="card" style="width: 18rem;">
        <img class="card-mg-top" src="${user.avatar_url}"/>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">Repositorios:<span class="badge">${user.public_repos}</span></li>
            <li class="list-group-item">Seguidores<span class="badge">${user.followers}</span></li>
            <li class="list-group-item">Seguindo<span class="badge">${user.following}</span></li>
            </ul>
            <div class="card-body>
                <a href="${user.html_url}"target="_blank" class="btn btn-warning btn-block">Ver Perfil></a>
    
                </div>
                </div>
                <div class="col-md-8"><div id"repos"></div></div>
                </div>`;
    }

    function showRepos(repos){
        let outup="";

        repos.forEach(repo => {
            outup += `<div class="card card-body mb-2">
            <div class="row">
                <div class="col-md-6"><a href="${repo.html_url}" target="_blank">${repo.name}</a></div>
                <div class="col-md-6">
                <span class="badge badge-primary">Stars:${repo.stargazer_count}</span>
                <span class="badge badge-primary">Watch:${repo.watchers_count}</span>
                <span class="badge badge-primary">Forks:${repo.forks_count}</span>
            
            </div>
        </div>
    </div>`
        });

        document.getElementById("repos").innerHTML = outup

    }
    
    search.addEventListener("keyup", (e) => {
        const user = e.target.value;

        if(user.length > 0){
            getUser(user).then(res => {
                showProfile(res.profile);
                showRepos(res.repos);

            });
        };
    
        
    
    })
    
    })();
    
    