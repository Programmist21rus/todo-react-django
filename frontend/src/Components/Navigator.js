import React from 'react';
import Button from 'react-bootstrap/Button';

const buttonArray = [
    {
        text: 'Создать автора',
        title: 'newauthor'
    },
    {
        text: 'Создать запись',
        title: 'newrecord'
    },
    {
        text: 'Создать тег записи',
        title: 'newtag'
    },
    {
        text: 'Все записи',
        title: 'records'
    }
]

class Navigator extends React.Component{
    render(){
        const {changeWindow} = this.props;
        return (
            <div className='navigator'>
                {buttonArray.map((button) => (
                    <div className="navigator__button">
                        <Button  variant="primary" onClick={changeWindow.bind(this, button.title)}>{button.text}</Button >
                    </div>
                ))}
            </div>
        )
    }
}

export default Navigator;