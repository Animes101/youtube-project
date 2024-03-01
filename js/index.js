//cataguris
let selectCatagure=1000;
let shorted=false;
const sortbtn=document.getElementById('sort-button');
sortbtn.addEventListener('click',function(){

    shorted=true;
    handleClick(selectCatagure,shorted);
})

const handleSort=()=>{
    alert('hello')
}

const cataguris=async ()=>{
    const res= await fetch('https://openapi.programming-hero.com/api/videos/categories');

    const data=await res.json();

    const fullData=data.data;
    buttonTextShow(fullData);
}

//button text show
const btnContainer=document.getElementById('button-container');
const buttonTextShow=(data)=>{

    data.forEach(text => {
        //console.log(text);
        const btn=document.createElement('button');
        btn.className='bg-gray-400 button p-2 rounded-md text-white text-xl'
        btn.innerText=text.category;
        btn.addEventListener('click',()=> {
            handleClick(text.category_id);
            const allButton=document.querySelectorAll('.button');
            for(button of allButton){
                button.classList.remove('bg-green-600');
                
            }
            btn.classList.add('bg-green-600')
        })
        btnContainer.appendChild(btn);

        
    });

}

//click handle

const handleClick=async(id,shorted)=>{
    //console.log(id)
    selectCatagure=id;
    const res=await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);

    const videoData=await res.json();
    const fullVideoData=videoData.data;

    showVideo(fullVideoData,shorted);

}
//video showAll display
const notVideo=document.getElementById('not-Video');
const cardContainer=document.getElementById('card-container');
const showVideo=(data,shorted)=>{

    if(shorted){
        data.sort((a,b)=>{
            const firstTotalView=a.others.views;
            const secontTotalView=b.others.views;

            const fristView=parseFloat(firstTotalView.replace('k' , '')) || 0;

            const secondView=parseFloat(secontTotalView.replace('k', '')) ||0;

            return fristView - secondView;
        })

    }
    //console.log(data);
    if(data.length === 0){
        notVideo.classList.remove('hidden')
    }else{
        notVideo.classList.add('hidden');
    }

    cardContainer.innerHTML=''

 data.forEach((one)=>{

    //console.log(one);
    let isVerified='';
    if(one.authors[0].verified){

        console.log(one.authors[0].verified);
        isVerified='<img class="rounded-full" src="img/v.png" alt="icon">'

    }
    const div=document.createElement('div');
    div.className='card w-96 bg-base-100 shadow-xl';
    div.innerHTML=`
    <figure><img class='w-full h-[300px]' src="${one.thumbnail}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <div class="card-title">
                        <img class="rounded-full w-[30px] h-[30px]" src="${one.authors[0].profile_picture}" alt="">
                        <h2>${one.authors[0].profile_name}</h2>

                      </div>
                      <p class='inline-block'>Awlad Hossain <span class='inline-block'>${isVerified}</span></p>
                      <h2>${one.others.views}</h2>
                    </div>
    
    `
    cardContainer.appendChild(div);
 });

}
handleClick(selectCatagure,shorted);
cataguris();