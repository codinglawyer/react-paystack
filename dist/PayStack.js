'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PayStack = function (_Component) {
  _inherits(PayStack, _Component);

  function PayStack(props) {
    _classCallCheck(this, PayStack);

    var _this = _possibleConstructorReturn(this, (PayStack.__proto__ || Object.getPrototypeOf(PayStack)).call(this, props));

    _this.payWithPaystack = function () {
      var paystackOptions = {
        key: _this.props.paystackkey,
        email: _this.props.email,
        amount: _this.props.amount,
        ref: _this.props.reference,
        metadata: _this.state.metadata,
        callback: function callback(response) {
          _this.props.callback(response);
        },
        onClose: function onClose() {
          _this.props.close();
        },
        currency: _this.state.currency,
        plan: _this.state.plan,
        quantity: _this.state.quantity,
        subaccount: _this.state.subaccount,
        transaction_charge: _this.state.transaction_charge,
        bearer: _this.state.bearer
      };
      if (_this.props.embed) {
        paystackOptions.container = "paystackEmbedContainer";
      }
      var handler = window.PaystackPop.setup(paystackOptions);
      if (!_this.props.embed) {
        handler.openIframe();
      }
    };

    _this.state = {
      text: _this.props.text || "Make Payment",
      class: _this.props.class || "",
      metadata: _this.props.metadata || {},
      currency: _this.props.currency || "NGN",
      plan: _this.props.plan || "",
      quantity: _this.props.quantity || "",
      subaccount: _this.props.subaccount || "",
      transaction_charge: _this.props.transaction_charge || 0,
      bearer: _this.props.bearer || ""
    };
    return _this;
  }

  _createClass(PayStack, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.embed ? this.payWithPaystack() : null;
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.embed ? _react2.default.createElement('div', { id: 'paystackEmbedContainer' }) : _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'button',
          { onClick: this.payWithPaystack, className: this.state.class },
          this.state.text
        )
      );
    }
  }]);

  return PayStack;
}(_react.Component);

PayStack.propTypes = {
  embed: _propTypes2.default.bool,
  text: _propTypes2.default.string,
  class: _propTypes2.default.string,
  metadata: _propTypes2.default.object,
  currency: _propTypes2.default.string,
  plan: _propTypes2.default.string,
  quantity: _propTypes2.default.string,
  subaccount: _propTypes2.default.string,
  transaction_charge: _propTypes2.default.number,
  bearer: _propTypes2.default.string,
  reference: _propTypes2.default.string.isRequired,
  email: _propTypes2.default.string.isRequired,
  amount: _propTypes2.default.number.isRequired, //in kobo
  paystackkey: _propTypes2.default.string.isRequired,
  callback: _propTypes2.default.func.isRequired,
  close: _propTypes2.default.func.isRequired
};

exports.default = PayStack;
