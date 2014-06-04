/*global console, rJS, RSVP, initDocumentPageMixin */
(function (window, rJS, RSVP, initDocumentPageMixin) {
  "use strict";

  var gadget_klass = rJS(window);
  initDocumentPageMixin(gadget_klass);
  gadget_klass
    /////////////////////////////////////////////////////////////////
    // ready
    /////////////////////////////////////////////////////////////////
    // Init local properties
    .ready(function (g) {
      g.props = {};
    })

    // Assign the element to a variable
    .ready(function (g) {
      return g.getElement()
        .push(function (element) {
          g.props.element = element;
        });
    })

    /////////////////////////////////////////////////////////////////
    // Acquired methods
    /////////////////////////////////////////////////////////////////
    .declareAcquiredMethod("aq_getAttachment", "jio_getAttachment")

    /////////////////////////////////////////////////////////////////
    // declared methods
    /////////////////////////////////////////////////////////////////
    .declareMethod("render", function (options) {
      var gadget = this;
      this.props.jio_key = options.id;

      return new RSVP.Queue()
        .push(function () {
          return RSVP.all([
            gadget.aq_getAttachment({
              "_id": gadget.props.jio_key,
              "_attachment": "body.json"
            }),
            gadget.aq_getAttachment({
              "_id": gadget.props.jio_key,
              "_attachment": "simulation.json"
            })
          ]);
        })
        .push(function (result_list) {
          gadget.props.element.querySelector(".json_input").textContent =
            result_list[0];
          gadget.props.element.querySelector(".json_output").textContent =
            result_list[1];
        });

    });

}(window, rJS, RSVP, initDocumentPageMixin));
