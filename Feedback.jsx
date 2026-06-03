import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Feedback_table  } from "../data";


export default function Feedback(){
    const feed= (note)=>(
    note<10? "Rattrapage" :
    note<12 && note>10? "Passable" :
    note>=12 && note<14? "A.bien" :
    note>=14 && note<16? "Bien" :
    note>=16 && note<18? "Très bien": "Excellent"
);
    return(
        <div>
            <h2>liste des membres</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Membre</th>
                        <th>Moyenne</th>
                        <th>Commentaire</th>
                    </tr>
                </thead>
                <tbody>
                    {Feedback_table.map((membre,i)=>(
                        <tr key={i}>
                            <td>{membre.nom}</td>
                            <td>{membre.moyenne}</td>
                            <td>{feed(membre.moyenne)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}