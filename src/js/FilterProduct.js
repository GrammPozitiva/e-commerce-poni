import React, { Component } from 'react';

class FilterProduct extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: new Set(),
      isOpened: false,
      isNew: -1,
      color: '0',
      startPrice: 0,
      endPrice: 1000,
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.handleToggleModal = this.handleToggleModal.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleChangeisNew = this.handleChangeisNew.bind(this);
    this.handleChangeStartPrice = this.handleChangeStartPrice.bind(this);
    this.handleChangeEndPrice = this.handleChangeEndPrice.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleClearState = this.handleClearState.bind(this);
    this.handleSubmitFilter = this.handleSubmitFilter.bind(this);
  }

  toggleModal() {
    this.setState({isOpened: !this.state.isOpened});
  }

  handleToggleModal(e) {
    e.preventDefault();
    this.toggleModal();
  }

  handleChangeColor(e) {
    this.setState({color: e.currentTarget.value});
  }

  handleChangeisNew(e) {
    this.setState({isNew: e.currentTarget.value});
  }

  handleChangeStartPrice(e) {
    this.setState({startPrice: e.target.value});
  }

  handleChangeEndPrice(e) {
    this.setState({endPrice: e.target.value})
  }

  handleChangeName(e) {
    if (e.target.checked) {
      this.setState({name: this.state.name.add(e.target.value.toLowerCase())})
    } else {
      this.state.name.delete(e.target.value.toLowerCase());
      this.setState({name: this.state.name});
    }
    //console.log(this.state.name);
  }

  handleClearState(e) {
    this.props.callback(el => true);
  }

  handleSubmitFilter(e) {
    e.preventDefault();
    this.props.callback((el) => {
      if (this.state.name.size > 0 && !this.state.name.has(el.kind.toLowerCase())) {
        return false;
      }
      if (this.state.color != 0 && el.color != this.state.color) {
        return false;
      }
      if (this.state.isNew != -1 && this.state.isNew != el.isNew) {
        return false;
      }
      if (el.price > this.state.endPrice || el.price < this.state.startPrice) {
        return false;
      }

      return true;
    });

    this.toggleModal();
  }

  render() {
    const styleModal = {
      display: this.state.isOpened ? 'block' : 'none'
    }
    return (
      <div className =  'container'>
        <a className = 'filter-button' onClick = {this.handleToggleModal}>Фильтр</a>
        <button className = 'filter-button-clear' onClick = {this.handleClearState}>Cбросить фильтр</button>
        <div className = 'filter-modal' style = {styleModal}>
          <div>
            <a title = 'Закрыть' className = 'filter-close' onClick = {this.handleToggleModal}>X</a>
            <form onSubmit = {this.handleSubmitFilter}>
              <p>Тип пони: </p>
              <input type ="checkbox" value = 'единорог' onChange = {this.handleChangeName} /> Единорог
              <input type ="checkbox" value = 'земная пони' onChange = {this.handleChangeName} /> Земная пони
              <input type ="checkbox" value = 'пегас' onChange = {this.handleChangeName} /> Пегас
              <input type ="checkbox" value = 'аликорн' onChange = {this.handleChangeName} /> Аликорн

              <p>Цвет: </p>
              <select value={this.state.color} onChange = {this.handleChangeColor}>
                <option value = '0'>Неважно</option>
                <option value = 'белый'>Белый</option>
                <option value = 'розовый'>Розовый</option>
                <option value = 'жёлтый'>Жёлтый</option>
                <option value = 'зелёный'>Зелёный</option>
              </select>

              <p>Новинка:<br/>
              <select value = {this.state.isNew} onChange = {this.handleChangeisNew}>
                <option value = '1'>Да</option>
                <option value = '0'>Нет</option>
                <option value = '-1'>Неважно</option>
              </select>
              </p>

              <p>Цена: </p>
                <label>ОТ: </label><input type = 'number' value = {this.state.startPrice} onChange = {this.handleChangeStartPrice}/>
                <p>
                <label>ДО: </label><input type = 'number' value = {this.state.endPrice} onChange = {this.handleChangeEndPrice} />
                </p>

              <input type = 'submit' value = 'Фильтровать'/>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default FilterProduct;
