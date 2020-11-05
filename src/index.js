document.addEventListener('DOMContentLoaded', (event) => {
    //display dogs to the page, fetch get request to access the data from server.
    
    // ***DOM ELements***
    // we need to select our #dog-bar container

    const baseUrl = 'http://localhost:3000/pups/'
    const dogCont = document.querySelector('#dog-bar')
    const dogImgCont = document.querySelector('#dog-info')
    // const statusButton = document.querySelector('')
     // console.log(statusButton)
    // ***Functions*** 
    // third step to render dogs is to build another function
    // that loops through our array of dogs, and applies the 
    // steps to each one from our renderDog Function.
    const renderDogs = (dogs) => {
        dogs.forEach(dog => {
            renderDog(dog)
        });
    }
    // second step is to build a function that creates a span 
    // then append it to the #dog-container.
    
    const renderDog = (dog) => {
        const dogSpan = document.createElement('span')
        dogSpan.innerText = dog.name 
        dogSpan.dataset.num = dog.id
        dogSpan.dataset.goodDog = dog.isGoodDog
        dogCont.append(dogSpan)
        // console.log(dogSpan)
    }
    
    const renderDogPic = (doggo) => {
        let dogStatus = doggo.isGoodDog
        if (dogStatus == 'true' || dogStatus == true) {
            dogStatus = "Good Dog!"
        } else if (dogStatus == 'false' || dogStatus == false) {
            dogStatus = " Bad Dog!"
        }
        dogImgCont.innerHTML = `
            <img src='${doggo.image}'>
            <h2 data-num='${doggo.id}'>${doggo.name}</h2>
            <button>${dogStatus}</button>
        `
        console.log(dogImgCont)
    }
    // ***Fetch Requests***
    
    // first step to grab the dogs from server.
    const getDogs = () => {
        fetch(baseUrl)
        .then(response => response.json())
        .then(renderDogs)
    }
    
    const getDogPic = (dogId) => {
        fetch(baseUrl + dogId)
        .then(response => response.json())
        .then(renderDogPic)
        
    }
    
    const patchDog = (dogId, value) => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                isGoodDog: value 
            })
        }
        fetch((baseUrl + dogId),options)
            .then(response => response.json())
            .then(renderDogPic)
        }
    
    // Event Listeners 
    const clickHandler = () => {
        document.addEventListener('click', event => {
            if (event.target.matches('span')) {
                const span = event.target
                const dogId = span.dataset.num
                // console.log(dogId)
                getDogPic(dogId)
            }
            if (event.target.matches('#dog-info> button')){
                let button = event.target
                let dogId = button.previousElementSibling.dataset.num
                if (button.innerText === "Good Dog!") {
                    patchDog(dogId, 'false')
                } else {
                    patchDog(dogId, 'true')
                }
                
            }
            
            
        })
        
    }
    
    getDogs();
    clickHandler();
    
});

