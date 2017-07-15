require(["jquery"],function($){
    $(()=>{
        let test = ()=>{
            let html = 
                `<div class="render">
                    <ul>
                        <li>1111111</li>
                        <li>2222222</li>
                        <li>3333333</li>
                    </ul>
                </div>`;
                $("main").append(html);
        }
    })
})