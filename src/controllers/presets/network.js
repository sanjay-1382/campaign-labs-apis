
import Network from '../../models/presets/network';
import { formatDateToYMDHIS } from '../../utils/utility';

export const addNetworkDetails = async (req, res) => {

    const networkDetails = req.body;
    if (!networkDetails.networkName) {
        // return res
        //     .status(400)
        //     .json({ status: "failed", message: "Please Enter Network Name" });
        return res.badRequest()
    }

    const result = await Network.findOne({ networkName: networkDetails.networkName });

    if (!result) {
        networkDetails.createdOn = formatDateToYMDHIS(new Date());
        networkDetails.active = "true";

        if (networkDetails.network_advertiser_name) {
            delete networkDetails.network_advertiser_name;
        }

        try {
            const newData = await Network(networkDetails);
            res.json({ status: "success", message: "Data inserted", newData });
        } catch (error) {
            console.error("Error inserting data: ", error);
            return res.status(500).json({ status: "failed", message: "Error inserting data: " })
        }
    } else {
        return res.status(400).json({
            status: "failed",
            message: "Network Name Already Exist,Please Type Diffrent Name"
        });
    }
}

export const getAllNetworkDetails = async () => {
    try {
        const networkData = await Network.find();
        res.status(200).json({ status: "success", data: networkData })
    } catch (error) {
        console.log(error);
        res.status(500).json({})
    }
}

export const getAllNetworkNames = () => {

}

export const updateNetworkDetails = () => {

}

export const updateNetworkActiveStatus = () => {

}