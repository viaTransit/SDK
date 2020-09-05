/**
 * @class Datasets
 * @classdesc All properties of one Datasets
 */
class Datasets {

    /**
     * Create an instance of Datasets
     */
    constructor(/*({id: String, datasets: Object, uploadedBy: String, verified: Boolean, attributes: Object|null}|null)*/object= null)
    {
        /**
         * Id
         * @type {string}
         */
        this.id = object && object.id ? object.id : "";
        /**
         * Datasets
         * @type {object}
         */
        this.datasets = object && object.datasets ? object.datasets : {};
        /**
         * UploadedBy
         * @type {string}
         */
        this.uploadedBy = object && object.uploadedBy ? object.uploadedBy : "";
        /**
         * Verified
         * @type {boolean}
         */
        this.verified = object && object.verified ? object.verified : false;
        /**
         * Attributes
         * @type {Object|null}
         */
        this.attributes = object && object.attributes ? object.attributes : {};
    }

    /**
     * Fill properties from viaTransit API return format
     * @param object
     */
    fill(/*({id: String, datasets: Object, uploadedBy: String, verified: Boolean, attributes: Object|null}|null)*/object)
    {
        this.id = String(object.id);
        this.datasets = object.datasets;
        this.uploadedBy = object.uploadedBy;
        this.verified = object.verified;
        this.attributes = object.attributes;
    }

    /**
     * Fill properties from viaTransit Database return format
     * @param object
     */
    fillFromDatabase(/*({id: String, datasets: Object, uploadedBy: String, verified: Boolean, attributes: Object|null}|null)*/object)
    {
        this.id = String(object._id);
        this.datasets = object.datasets;
        this.uploadedBy = object.uploadedBy;
        this.verified = object.verified;
        this.attributes = object.attributes;
    }

    /**
     * Verifying data completion of Datasets
     */
    isComplete()
    {
        return this.datasets instanceof Object &&
        this.hasValidType() &&
        this.hasCoordinates() &&
        typeof this.id == "string" &&
        typeof this.uploadedBy == "string" &&
        typeof this.verified == "boolean" &&
        this.attributes instanceof Object;
    }

    /**
     * Verifying if the datasets is verified by Admin
     */
    isVerified()
    {
        return this.verified;
    }

    /**
     * Return list of datasets types
     */
    getAvailablesTypes()
    {
        return ["Point", "Polygon", "LineString"];
    }

    /**
     * Return list of differente kind of datasets
     */
    getKinds()
    {
        return ['cycleways', 'carshare-areas'];
    }

    /**
     * Verifying if the datasets has a valid geoJSON type
     */
    hasValidType()
    {
        const types = this.getAvailablesTypes();

        return types.includes(this.datasets.type);
    }

    /**
     * Verifying if the datasets has coordinates
     */
    hasCoordinates()
    {
        return this.datasets.coordinates instanceof Array && this.datasets.coordinates.length > 0;
    }

    /**
     * Get attribute value from key
     * @param key
     * @returns {*}
     */
    getAttribute(/*String*/key) {
        if (this.attributes === null || this.attributes === undefined)
            return null;

        let attr = this.attributes[key];

        return attr === undefined ? null : attr;
    }

}

module.exports = Datasets;