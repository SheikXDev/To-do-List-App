import React, { useState, useEffect } from 'react'
import "./indexStyle.css";
import { RiTodoLine } from "react-icons/ri"
import { MdDeleteOutline } from "react-icons/md"
import { AiFillEdit } from "react-icons/ai"
// import { TiTickOutline } from "react-icons/ti";
import TextBox from '../../Components/TextBox';

import Button from '../../Components/Button/button';
import { AiFillCloseCircle } from "react-icons/ai"
import Alert from "../../Components/Alert/Alert.js"


export default function Home() {

    const [todo, setTodo] = useState("");
    const [List, setList] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [modal, setModal] = useState(false);
    const [selecToDo, setselecTodo] = useState("");
    const [confDelt, setConfDelt] = useState(false);
    const [confirmD, setConfirmD] = useState("");
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState('');



    useEffect(() => {
        let len = List?.length;
        if (len !== 0) {                                // checking whether array is empty or not by finding the length of the array
            localStorage.setItem('todolist', JSON.stringify(List))  // setting item in local storage here 'todolist' is name of the local storage array
        }                                                           // converting into Json String 
    }, [List]
    );

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('todolist'));    // coverting Json String Back to array by getItem
        console.log(storage);
        setList(storage);               // Setting list 
    }, [])

    const handleonChange = (e) => {
        // console.log(e.target.value);
        const ToDo = e.target.value;
        setTodo(ToDo);                              // track the todo
    }

    const handleClick = () => {
        if (todo !== "") {
            setList([...List, todo]);           // add task to the List
            console.log([...List, todo]);
            setTodo("");                        // Setting todo Empty  (Will empty the Text box after adding a new task)
        }
        else {
            handleFlag("The task shouldn't be blank!");
        }
    }

    const handledelete = (task) => {
        //Deleting the task
        console.log("clicked vroiii", task);
        const index = List.findIndex(list => list === confirmD);  // getting the index of the task to be deleted
        console.log(index);
        const updatedlist = [...List];  // creating a new list to store the previous array list
        updatedlist.splice(index, 1);   // updating the new array by splice method
        setList(updatedlist);
        setConfDelt(false);  // close the pop once the function done
        handleFlag("Deleted Successfuly");
    }

    const renameTask = (e) => {
        setTaskName(e.target.value);
    }


    const replaceTask = () => {
        console.log(selecToDo, taskName);
        const index = List.findIndex(list => list === selecToDo);
        console.log(index);
        const updatedlist = [...List];
        updatedlist.splice(index, 1, taskName);
        setList(updatedlist);
        setselecTodo("");
        setTaskName("");
        setModal(false);
        handleFlag("Renamed Successfuly");

    }



    const deleteit = () => {
        setList([]);
        console.log(List);
    }

    const handleFlag = (message) => {
        setAlert(true);
        setMessage(message);
        setTimeout(() => {
            setAlert(false);
        }, 3000)
    }




    return (
        <>
            <section className='home'>
                {confDelt && <div className='delete-pop'>
                    <div className='delete-cntd'>
                        <h3>Are You Sure to delete this Task?</h3>
                        <div className='btn-cntd'>
                            <button className='btn' onClick={() => handledelete()} >Yes</button> <button className='btn' onClick={() => setConfDelt(false)}>No</button>
                        </div>

                    </div>
                </div>}


                {modal && <div className='pop-modal' >
                    <div className='pop'>
                        <TextBox textValue={taskName} onChange={renameTask} />
                        {/* <input type={"text"} value={taskName} placeholder="Task name to be changed" onChange={renameTask}></input> */}
                        <button className='btn' onClick={replaceTask}>Rename</button>
                        <div onClick={closePop => { setModal(false) }}><AiFillCloseCircle size={20} /></div>
                    </div>
                </div>}
                <h1>Stay Productive and Focused</h1>

                <div className='home-container'>
                    <div className='list-container'>
                        <div className='icon-cntd'>
                            <RiTodoLine size={60} />
                            <h2>What you need to do Today?</h2>
                        </div>
                        <div className='todo-container'>
                            <div className='text-cntd'>
                                <TextBox textValue={todo} onChange={(e) => handleonChange(e)} />
                                <Button btnName={"Add"} byClick={handleClick} />
                            </div>

                        </div>
                        <div className='lists-cntd'>
                            {
                                List?.map(list => {
                                    return <div className='lists'>
                                        <div className='task-name'>{list}</div>
                                        <div className='icn-cntd' onClick={() => {
                                            setModal(true);
                                            setselecTodo(list);
                                            setTaskName(list);
                                        }}><AiFillEdit /></div>
                                        <div className='icn-cntd' onClick={() => {
                                            setConfirmD(list);
                                            setConfDelt(true);
                                        }}><MdDeleteOutline /></div>
                                    </div>
                                })
                            }
                        </div>
                        {
                            List?.length > 0 &&
                            <button className='btn' onClick={deleteit} >Clear List</button>

                        }
                        {
                            alert && <Alert message={message} />
                        }



                    </div>
                </div>

            </section >

        </>
    )
}
