import React,{useEffect, useState} from "react";

function Counter({uid}){
    const [count, setCount] = useState(0);

    //fetch count
    useEffect(()=>{
        if (!uid) return;
        fetch(`http://localhost:3001/get-count/${uid}`)
        .then(res => res.json())
        .then(data =>{setCount(data.count)
            console.log('fetched count',data.count)
        })
        .catch(err => console.error('Error fetching count:',err));
    }, [uid])

    //save count to backend
    const saveCount = ()=> {
        fetch('http://localhost:3001/save-count',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({uid,count}),
        })
        .then(data => {
            if( data.success) alert('✅ Count saved!')
        })
        .catch(err => console.error('Error saving count:',err))
    }

    return(
        <div style={{textAlign : 'center', marginTop : '50px'}}>
            <h2>Count: {count} </h2>
            <button onClick= {() => {setCount(count+1)
            }} >➕ Increment</button>
            <button onClick={() => setCount(count - 1)}>➖ Decrement</button>
            <button onClick={() => setCount(0)}>🔄 Reset</button>
            <br /><br />
            <button onClick={saveCount}>💾 Save Count</button>

        </div>
    )

}

export default Counter