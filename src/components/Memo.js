import { useState } from "react";

export default function Memo({ memo, delele, updato }) {

    const [newname, setnewname] = useState('')

    const handleChange = (e) => {

        e.preventDefault();

        memo.name = "";

        setnewname(e.target.value);
    
    }




    return (
        <div className="notes">
            <textarea onChange={handleChange} className='note' value={memo.name === "" ? newname : memo.name}>
                {console.log(memo._id)}
            </textarea>
            <div className="button-pack">
                <button className='btn first btn-primary' onClick={() => { delele(memo.name) }} >delete</button>
                <button className='btn second btn-primary' onClick={() => { updato(memo._id, newname) }}>update</button>
            </div>
        </div>
    )

}
