import { Component,Method ,Prop} from '@stencil/core';

@Component({
  tag:'avs-modal',
  styleUrl:'avs-modal.css',
  shadow: true
})

export class Modal {
  /**
   * header text
   */
  @Prop({
    reflectToAttr:true
  }) headertext: string;

    /**
   * show/hide avs modal
   */
  @Prop({
    reflectToAttr:true,
    mutable:true
  }) open: boolean;


  //modal close
  onModalClose=()=>{
    this.open = false
  }


//modal open
@Method()
onModalOpen(){
this.open = true
    }



  render(){
    let content = null;
    if(this.open){
      content = (
<div class="avs-modal-container"><h1>{this.headertext}</h1>
<button onClick={this.onModalClose} class="close-modal">x</button>
  <main>
    <slot></slot>
  </main>
  </div>
      )
    }

  return content


  }

}

