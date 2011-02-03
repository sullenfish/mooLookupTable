var MooLookupTable = new Class({
    initialize: function(table, primaryKey) {
        if (table) {
            this.table = table;
        } else {
            return false;
        }
        // set primary key
        switch (typeOf(primaryKey)) {
        case 'element':
        case 'textnode':
            primaryKey = primaryKey.get('text');
            break;
        case 'string':
            break;
        default:
            var pk = this.table.getElement('thead .primary-key');
            primaryKey = pk ? pk.get('text') : null;
        }
        this.primaryKey = primaryKey ? primaryKey : this.table.getElement('th').get('text');
    },
    lookup: function(primaryKeyValue, keys) {
        if (!primaryKeyValue || !keys) {
            return null;
        }
        keys = Array.from(keys);
        var values = [],
            primaryColumn = this.table.getElements('thead ^ tr th').map(function(item) {
                return item.get('text');
            }).indexOf(this.primaryKey),
            primaryRow = this.table.getElements('tbody tr td:nth-child(' + (primaryColumn + 1) + ')').map(function(item) {
                return item.get('text');
            }).indexOf(primaryKeyValue);
        if (primaryRow < 0) return null; // primary key value not found
        keys.each(function(key) {
            var keyColumn = this.table.getElements('thead ^ tr th').map(function(item) {
                return item.get('text');
            }).indexOf(key);
            if (keyColumn >= 0){ // key column was found
            	values.push(this.table.getElement('tbody tr:nth-child(' + (primaryRow + 1) + ') td:nth-child(' + (keyColumn + 1) + ')').get('text'));
            }
        }, this);
        return values;
    }
});