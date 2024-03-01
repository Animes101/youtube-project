//cataguris
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
        console.log(text);
        const btn=document.createElement('button');
        btn.className='bg-gray-400 p-2 rounded-md text-white text-xl'
        btn.innerText=text.category;
        btn.addEventListener('click',()=>handleClick(text.category_id));
        btnContainer.appendChild(btn);

        
    });

}

//click handle

const handleClick=(id)=>{
    console.log(id)
}

cataguris();