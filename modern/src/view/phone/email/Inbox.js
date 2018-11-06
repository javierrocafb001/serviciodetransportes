Ext.define('Admin.view.phone.email.Inbox', {
    extend: 'Ext.dataview.DataView',
    itemId: 'phoneemailinbox',
    id: 'phoneemailinbox',
    itemTpl:
        '<div class="inbox-item">'+
            '<div class="inbox-inner-row inbox-{read:pick(\'unread\',\'read\')}">'+
                '<div class="list-cls inbox-from">{unit}</div>'+
                '<div class="inbox-date">'+
                    '<tpl if="has_attachments">'+
                        '<span class="x-fa fa-paperclip inbox-attachment"></span>'+
                    '</tpl>'+
                    '{lastupdate}'+
                '</div>'+
            '</div>'+
            '<div class="inbox-inner-row">'+
                '<div class="inbox-summary">{distance}' + ' ' + "meters" + '</div>'+
                 '</div>' +
        '</div>'
});
