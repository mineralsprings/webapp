var formResizer = {

  counter: 1,

  _getLastFieldSet: function () {
    var fields    = document.getElementsByTagName("fieldset");
    var lastfield = fields.item(fields.length - 1);
    return lastfield;
  },

  addItem: function () {
    var newname =  'field-' + formResizer.counter;
    var newfield = "";

    newfield = '<fieldset class="field" id="' + newname + '" name="' + newname + '">\n';

    newfield += `
        <label>
          Item name:
          <input type="text" name="` + newname + `-name" value=""/>
        </label>
        <label>
          Description:
          <input type="textarea" name="` + newname + `-desc" value=""/>
        </label>
        <label>
          Price:
          <input type="number" name="` + newname + `-price" value=""/>
        </label>
        <label onclick="javascript:doSpecialCheckBox(this)">
          Options?
          <input type="checkbox" name="` + newname + `-options" value=""/>
        </label>`;

    newfield += '<button type="button" onclick="javascript:formResizer.removeItem(' + formResizer.counter +
                ');">Remove this item</button>\n';

    newfield += '</fieldset>';
    document.getElementById("edit-form").insertAdjacentHTML('beforeend', newfield);
    ++formResizer.counter;
  },

  removeLast: function () {
    var lastfield = formResizer._getLastFieldSet();
    if (null === lastfield) { return; }
    lastfield.parentNode.removeChild(lastfield);
  },

  removeItem: function (n) {
    --formResizer.counter;
    if (0 === n) { return; }
    var elem = document.getElementById("field-" + n);
    elem.parentNode.removeChild(elem);
  }
}

function formExtract(name) {
  var items = {};
  for (fs of document.getElementsByTagName("fieldset")) {
    var res = {};
    for (intag of fs.getElementsByTagName("input")) {
      var val = intag.type === "checkbox" ? intag.checked : intag.value;
      var nme = intag.name;
      res[nme] = val;
    }
    items[fs.id] = res;
  }
  console.log(items)
}

function doSpecialCheckBox(ctx) {
  var cbox    = ctx.getElementsByTagName("input")[0],
      checked = cbox.checked,
      parent  = ctx.parentNode;

  var optform = `
      <label class='options-label'>
        Name:
        <input type='text' name='` + cbox.name + `-options0-name'/>
      </label>

      <label class='options-label'>
        Price:
        <input type='number' name='` + cbox.name + `-options0-price'/>
      </label>

      <br>

      <label class='options-label'>
        Name:
        <input type='text' name='` + cbox.name + `-options1-name'/>
      </label>

      <label class='options-label'>
        Price:
        <input type='number' name='` + cbox.name + `-options1-price'/>
      </label>

      <br>

      <label class='options-label'>
        Name:
        <input type='text' name='` + cbox.name + `-options2-name'/>
      </label>

      <label class='options-label'>
        Price:
        <input type='number' name='` + cbox.name + `-options2-price'/>
      </label>
    `;

  if (checked) {
    parent.insertAdjacentHTML("beforeend", optform);
  } else {
    parent.removeChild(document.getElementById(cbox.name + "-fieldset"))
  }
}

function testFormsOffline(elv) {
  currentGoogleUser = { nih_info: { is_elevated: elv } };
  afterGLoginWriter();
}