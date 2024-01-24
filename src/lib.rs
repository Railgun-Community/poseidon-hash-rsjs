use node_bindgen::core::NjError;
use node_bindgen::derive::node_bindgen;
use ruint::{aliases::U256, uint};
use rs_poseidon::poseidon::hash;

#[node_bindgen]
pub fn poseidon(args: Vec<String>) -> Result<String, NjError> {
    let error_message = "TypeError: expected an array of hexadecimal strings";

    let mut inputs: Vec<U256> = Vec::new();
    let res = args.iter().try_for_each(|arg| {
        let u256 = U256::from_str_radix(arg.as_str(), 16);
        match u256 {
            Err(_) => return Err(NjError::Other(error_message.to_owned())),
            Ok(_) => {
                inputs.push(u256.unwrap());
                Ok(())
            }
        }
    });
    if res.is_err() {
        return Err(res.err().unwrap());
    }
    let scalar_field: U256 =
        uint!(21888242871839275222246405745257275088548364400416034343698204186575808495617_U256);
    for i in 0..inputs.len() {
        let input = &inputs[i];
        if input >= &scalar_field {
            inputs[i] = input % &scalar_field;
        }
    }

    let output = hash(&inputs);
    Ok(hex::encode(output.to_be_bytes_trimmed_vec()))
}
