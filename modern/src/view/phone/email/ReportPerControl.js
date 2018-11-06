Ext.define('Admin.view.phone.email.ReportPerControl', {
    extend: 'Ext.dataview.DataView',
    itemTpl:
        '<div class="inbox-item">'+
            '<div class="inbox-inner-row inbox-{read:pick(\'unread\',\'read\')}">'+
                '<div class="list-cls inbox-from">{unit}</div>'+
                '<div class="inbox-date">'+
                    '<tpl if="has_attachments">'+
                        '<span class="x-fa fa-paperclip inbox-attachment"></span>'+
                    '</tpl>'+
                    '{reportdate}'+
                '</div>'+
            '</div>'+
            '<div class="inbox-inner-row">'+
                '<div class="inbox-summary">{status}' + ': ' + "{count}" + '</div>'+
                 '</div>' +
        '</div>'
});
