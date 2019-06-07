/**
 * ************************************
 *
 * @module  DisclaimerComponent
 * @author  katzman
 * @date    06/04/2019
 * @description
 *
 * ************************************
 */


import React, {Component} from 'react';
import dbLogo from '../assets/svg/db_logo_greenyellow.svg';
import checkmark from '../assets/svg/checkMark.svg';


class DisclaimerComponent extends Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            checkMarks:{ top:false, middle:false, bottom:false },
            enableEnterBtn:false
        }
    }

    updateCheck = ( item, e ) =>
    {
        const checkMarks = Object.assign({}, this.state.checkMarks );
        checkMarks[item] = !checkMarks[item];

        let enableEnterBtn = true;

        Object.values( checkMarks ).forEach(( value ) =>
        {
           if( !value ) enableEnterBtn = false;
        });

        this.setState({ checkMarks, enableEnterBtn });
    };

    render()
    {
        const buttonCls = this.state.enableEnterBtn ? '' : 'disabled';

        return (
            <div className="disclaimerComponent">

                <div className='logoUpperRighContainer'>
                    <img src={dbLogo} className='logoSmallUpperRight' alt='logo' />
                </div>

                <div className='titleContainer'>
                    <div className='title'>DISCLAIMER</div>
                </div>

                <div className='disclaimerBox'>

                    <div className='checkBoxContainer top'>
                        <CheckBox updateCheck={this.updateCheck.bind( this, 'top')} checked={this.state.checkMarks.top} />
                        <div>I understand that this assessment tool is for demonstration purposes only and does not constitute legal advice.</div>
                    </div>

                    <div className='checkBoxContainer middle'>
                        <CheckBox updateCheck={this.updateCheck.bind( this, 'middle')} checked={this.state.checkMarks.middle}/>
                        <div>I understand that the information contained in this demonstration is confidential, copyrighted, may constitute trade secrets, and may not be shared with others without permission</div>
                    </div>

                    <div className='checkBoxContainer bottom'>
                        <CheckBox updateCheck={this.updateCheck.bind( this, 'bottom')} checked={this.state.checkMarks.bottom} />
                        <div>I have read and agree to the Terms of Use and Privacy Policy.</div>
                    </div>

                </div>

                <div className={buttonCls} onClick={this.props.nextScreen}>ENTER</div>

            </div>
        );
    }
}

const CheckBox = ( props ) =>
{
    const checkMarkCls = props.checked ? 'checkMark' : 'checkMark hide';

    return (
        <div onClick={props.updateCheck} className='checkbox'>
            <div className={checkMarkCls}>
                <img src={checkmark} className='checkmark' alt='checkmark' />
            </div>
        </div>
    )
};


export default DisclaimerComponent;